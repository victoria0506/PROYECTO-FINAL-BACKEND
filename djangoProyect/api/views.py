from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (
    TipoUserSerializer,
    UsuariosSerializer,
    restaurantesSerializer,
    CalificacionSerializer,
    favoritosSerializer,
    calendarioSerializer,
    especialidadSerializer,
    CantonSerializer,
    distritoSerializer,
    RestaEspeciSerializer,
    ImagenSerializer,
    PlatillosSeralizer,
    menuSerializer,)
from .models import (
    TipoUsuario,
    Usuarios,
    restaurantes,
    calificaciones,
    favoritos,
    menu_restaurantes,
    calendario,
    tipo_especialidad,
    Canton,
    distrito,
    RestaEspecialidades,
    Imagenes,
    Platillos_destacados,)
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .auth import registro_user, login_user, create_Authorization, create_Refresh
from .authentication import CookieAuthentication
from django.db.models import Avg
from rest_framework.views import APIView
from imagekitio import ImageKit
import json
from rest_framework.permissions import IsAdminUser
from django.core.files.storage import default_storage
import requests
from decimal import Decimal
from rest_framework.decorators import api_view
from rest_framework.exceptions import PermissionDenied
from rest_framework.decorators import action
from django.db.models.signals import post_save
from django.dispatch import receiver

# Vista para gestionar tipos de usuarios
class TipouserView(ModelViewSet):
    queryset = TipoUsuario.objects.all()
    serializer_class = TipoUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para el registro de usuarios
class RegisterView(ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def register(self, request):
        serializer = UsuariosSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            is_staff = email == 'Admi@RestaurApp.com'  # Determina si el usuario es un administrador
            serializer.validated_data['is_staff'] = is_staff
            usuario = serializer.save()
            return Response({"message": "Registro exitoso"}, status=201)
        return Response(serializer.errors, status=400)

# Vista para el inicio de sesión de usuarios
class LoginView(ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request):
        email = request.data.get('email')
        contrasena = request.data.get('contrasena')
        usuario = login_user(email, contrasena)
        if usuario:
            access_token = create_Authorization(usuario)
            refresh_token = create_Refresh(usuario)
            response = Response(
                {"message": "Login exitoso"},
                status=status.HTTP_200_OK
            )
            response.set_cookie(key='access_token', value=access_token, httponly=True, secure=True)
            response.set_cookie(key='refresh_token', value=refresh_token, httponly=True, secure=True)
            return Response({"access_token": access_token, "refresh_token": refresh_token}, status=200)
        return Response({"message": "Credenciales inválidas"}, status=400)

# Vista para gestionar cantones
class CantonView(ModelViewSet):
    queryset = Canton.objects.all()
    serializer_class = CantonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para gestionar distritos
class distritoView(ModelViewSet):
    queryset = distrito.objects.all()
    serializer_class = distritoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para gestionar restaurantes
class RestauranteView(ModelViewSet):
    queryset = restaurantes.objects.all()
    serializer_class = restaurantesSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser]

# Vista para gestionar imágenes
class ImagenesView(ModelViewSet):
    queryset = Imagenes.objects.all()
    serializer_class = ImagenSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        restaurante_id = self.request.query_params.get('restaurante_id', None)
        if restaurante_id is not None:
            queryset = queryset.filter(restaurante_id=restaurante_id)  # Filtra las imágenes por restaurante
        return queryset

# Vista para gestionar platillos destacados
class PlatillosView(ModelViewSet):
    queryset = Platillos_destacados.objects.all()
    serializer_class = PlatillosSeralizer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para gestionar especialidades
class especialidadesView(ModelViewSet):
    queryset = tipo_especialidad.objects.all()
    serializer_class = especialidadSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para gestionar especialidades de restaurantes
class RestaEspecilidadesView(ModelViewSet):
    queryset = RestaEspecialidades.objects.all()
    serializer_class = RestaEspeciSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Vista para gestionar calificaciones
class CalificacionView(ModelViewSet):
    queryset = calificaciones.objects.all()
    serializer_class = CalificacionSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            calificacion = serializer.save(usuario_id=request.user)  # Asocia la calificación con el usuario actual
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            calificacion = serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @receiver(post_save, sender=calificaciones)
    def actualizar_promedio_signal(sender, instance, created, **kwargs):
        if created or instance.calificacion:  # Actualiza el promedio si es una nueva calificación
            instance.restaurante_id.actualizar_promedio()

# Vista para gestionar favoritos
class favoritosView(ModelViewSet):
    queryset = favoritos.objects.all()
    serializer_class = favoritosSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, usuario_id):
        favoritos_list = favoritos.objects.filter(usuario_id=usuario_id)
        if not favoritos_list.exists():
            return Response([], status=status.HTTP_404_NOT_FOUND)  # Devuelve 404 si no hay favoritos
        serializer = self.serializer_class(favoritos_list, many=True)
        return Response(serializer.data)

# Vista para gestionar menús de restaurantes
class MenuView(ModelViewSet):
    queryset = menu_restaurantes.objects.all()
    serializer_class = menuSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

# Función para agregar imágenes al menú
@api_view(['POST'])
def add_menu_images(request):
    images_data = request.data.get('images')  # Se espera que 'images' sea una lista de URLs
    restaurante_id = request.data.get('restaurante_id')

    if not images_data:
        return Response({"error": "No se encontraron imágenes"}, status=status.HTTP_400_BAD_REQUEST)
    
    if not restaurante_id:
        return Response({"error": "restaurante_id es necesario"}, status=status.HTTP_400_BAD_REQUEST)

    try:
        for image_url in images_data:
            # Aquí puedes agregar validaciones para cada URL si es necesario
            menu_item = menu_restaurantes.objects.create(
                url_image=image_url,  # Asegúrate de que el campo sea correcto
                restaurante_id=restaurante_id
            )
        
        return Response({"message": "Imágenes agregadas exitosamente"}, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

# Vista para gestionar el calendario
class calendarioView(ModelViewSet):
    queryset = calendario.objects.all()
    serializer_class = calendarioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = calendario.objects.all()
        restaurante_id = self.request.query_params.get('restaurante_id', None)
        if restaurante_id is not None:
            queryset = queryset.filter(restaurante_id=restaurante_id)  # Filtra el calendario por restaurante
        return queryset

# Vista para generar autenticación con ImageKit
class GenerateImageKitAuth(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            with open("secrets.json", "r") as file:
                secrets = json.load(file)
            imagekit = ImageKit(
                private_key=secrets["IMAGEKIT_PRIVATE_KEY"],
                public_key=secrets["IMAGEKIT_PUBLIC_KEY"],
                url_endpoint=secrets["IMAGEKIT_URL_ENDPOINT"],
            )
            auth_params = imagekit.get_authentication_parameters()  # Obtiene los parámetros de autenticación
            return Response(auth_params, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
