from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (TipoUserSerializer,UsuariosSerializer,
restaurantesSerializer,
CalificacionSerializer,favoritosSerializer,calendarioSerializer,especialidadSerializer, CantonSerializer, distritoSerializer, RestaEspeciSerializer, ImagenSerializer, PlatillosSeralizer, menuSerializer)
from .models import TipoUsuario,Usuarios,restaurantes,calificaciones,favoritos, menu_restaurantes,calendario,tipo_especialidad, Canton, distrito, RestaEspecialidades, Imagenes, Platillos_destacados
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
from django.shortcuts import get_object_or_404
from django.http import JsonResponse

class TipouserView(ModelViewSet):
    queryset= TipoUsuario.objects.all()
    serializer_class= TipoUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class RegisterView(ModelViewSet):
    queryset = Usuarios.objects.all()
    serializer_class = UsuariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def register(self, request):
        serializer = UsuariosSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data.get('email')
            is_staff = email == 'Admi@RestaurApp.com'
            serializer.validated_data['is_staff'] = is_staff
            usuario = serializer.save()  
            return Response({"message": "Registro exitoso"}, status=201)
        return Response(serializer.errors, status=400)
    
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

class CantonView(ModelViewSet):
    queryset= Canton.objects.all()
    serializer_class= CantonSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class distritoView(ModelViewSet):
    queryset= distrito.objects.all()
    serializer_class= distritoSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class RestauranteView(ModelViewSet):
    queryset = restaurantes.objects.all()
    serializer_class = restaurantesSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAdminUser] 
  
class ImagenesView(ModelViewSet):
    queryset= Imagenes.objects.all()
    serializer_class= ImagenSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = super().get_queryset()
        restaurante_id = self.request.query_params.get('restaurante_id', None)
        if restaurante_id is not None:
            queryset = queryset.filter(restaurante_id=restaurante_id)
        return queryset
        
class PlatillosView(ModelViewSet):
    queryset= Platillos_destacados.objects.all()
    serializer_class= PlatillosSeralizer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class especialidadesView(ModelViewSet):
    queryset=tipo_especialidad.objects.all()
    serializer_class=especialidadSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class RestaEspecilidadesView(ModelViewSet):
    queryset= RestaEspecialidades.objects.all()
    serializer_class= RestaEspeciSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class CalificacionView(ModelViewSet):
    queryset = calificaciones.objects.all()
    serializer_class = CalificacionSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            calificacion = serializer.save(usuario_id=request.user)
            # No es necesario llamar a actualizar_promedio aquí,
            # se hará automáticamente gracias a la señal.
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if serializer.is_valid():
            calificacion = serializer.save()
            # No es necesario llamar a actualizar_promedio aquí,
            # se hará automáticamente gracias a la señal.
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @receiver(post_save, sender=calificaciones)
    def actualizar_promedio_signal(sender, instance, created, **kwargs):
        if created or instance.calificacion:  # Llama a la función de promedio si se crea o se actualiza
            instance.restaurante_id.actualizar_promedio()  # Asegúrate de que este método exista

class favoritosView(ModelViewSet):
    queryset=favoritos.objects.all()
    serializer_class=favoritosSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]
    
    
class MenuView(ModelViewSet):
    queryset= menu_restaurantes.objects.all()
    serializer_class= menuSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    
    def get_queryset(self):
        restaurante_id = self.request.query_params.get('restaurante_id')
        if restaurante_id:
            return menu_restaurantes.objects.filter(restaurante_id=restaurante_id)
        return super().get_queryset()
    
def guardar_menu(request):
    if request.method == 'POST':
        restaurante_id = request.data.get('restaurante_id')
        menu = get_object_or_404(menu_restaurantes, restaurante_id=restaurante_id)

        # Iterar sobre las páginas
        for i in range(1, 8):
            file = request.FILES.get(f'pagina_{i}')
            if file:
                # Asigna el archivo en lugar de la URL
                setattr(menu, f'pagina_{i}', file)
        
        menu.save()  # Guarda los cambios en el menú
        return JsonResponse({'message': 'Imágenes guardadas exitosamente'}, status=200)
    
    return JsonResponse({'error': 'Método no permitido'}, status=405)
    
class calendarioView(ModelViewSet):
    queryset=calendario.objects.all()
    serializer_class=calendarioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        queryset = calendario.objects.all()
        restaurante_id = self.request.query_params.get('restaurante_id', None)
        if restaurante_id is not None:
            queryset = queryset.filter(restaurante_id=restaurante_id)
        return queryset
    

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
            auth_params = imagekit.get_authentication_parameters() 
            return Response(auth_params, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        
def post(self, request):
    try:
        # Leer credenciales desde secrets.json
        with open("secrets.json", "r") as file:
            secrets = json.load(file)

        # Obtener el archivo de la solicitud
        image_file = request.FILES.get('imageFile')
        if not image_file:
            return Response({"error": "No se encontró ningún archivo"}, status=status.HTTP_400_BAD_REQUEST)

        # Validar restaurante_id y tipo_imagen
        restaurante_id = request.data.get('restaurante_id')
        tipo_imagen = request.data.get('tipo_imagen')
        url_header = request.data.get('url_header')
    
        
        if not restaurante_id:
            return Response({"error": "restaurante_id es necesario"}, status=status.HTTP_400_BAD_REQUEST)
        if not tipo_imagen:
            return Response({"error": "tipo_imagen es necesario"}, status=status.HTTP_400_BAD_REQUEST)
  
        if not url_header:
           return Response({"error": "url_header es necesario"}, status=status.HTTP_400_BAD_REQUEST)


        # Guardar temporalmente el archivo
        temp_file_path = default_storage.save(image_file.name, image_file)

        # Instanciar ImageKit
        imagekit = ImageKit(
            private_key=secrets["IMAGEKIT_PRIVATE_KEY"],
            public_key=secrets["IMAGEKIT_PUBLIC_KEY"],
            url_endpoint=secrets["IMAGEKIT_URL_ENDPOINT"],
        )

        # Subir la imagen a ImageKit
        upload_response = imagekit.upload_file(
            file=open(temp_file_path, "rb"),
            file_name=image_file.name,
        )

        # Eliminar el archivo temporal
        default_storage.delete(temp_file_path)

        if upload_response.get('error'):
            return Response({"error": upload_response['error']['message']}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Guardar la URL, restaurante_id y tipo_imagen en el modelo Imagenes
        nueva_imagen = Imagenes.objects.create(
            url_img=upload_response['response']['url'],
            url_header=url_header,
            restaurante_id=restaurante_id,
            tipo_imagen=tipo_imagen  # Guardar el tipo de imagen
        )

        return Response({
            "url": nueva_imagen.url_img,
             "url_header": nueva_imagen.url_header,
            "fileId": upload_response['response']['fileId']
        }, status=status.HTTP_201_CREATED)

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
