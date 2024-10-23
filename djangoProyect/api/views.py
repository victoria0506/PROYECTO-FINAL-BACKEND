from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (TipoUserSerializer,UsuariosSerializer,
restaurantesSerializer,
CalificacionSerializer,favoritosSerializer,calendarioSerializer,especialidadSerializer, CantonSerializer, distritoSerializer, RestaEspeciSerializer, ImagenSerializer, PlatillosSeralizer)
from .models import TipoUsuario,Usuarios,restaurantes,calificaciones,favoritos,calendario,tipo_especialidad, Canton, distrito, RestaEspecialidades, Imagenes, Platillos_destacados
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from .auth import registro_user, login_user, create_Authorization, create_Refresh
from .authentication import CookieAuthentication
from django.db.models import Avg

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
            registro_user(serializer.validated_data)
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
        # print(f"Email: {email}, Contraseña: {contrasena}")
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
    queryset= restaurantes.objects.all()
    serializer_class= restaurantesSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        nuevo_restaurante = serializer.save()
        
        promedio_calificacion = calificaciones.objects.filter(
            restaurante_id=nuevo_restaurante
        ).aggregate(Avg('calificacion'))['calificacion__avg']
        
        nuevo_restaurante.calificacion_promedio = promedio_calificacion or 0  
        nuevo_restaurante.save()

        return Response(serializer.data, status=201)
    
    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        updated_restaurante = serializer.save()
    
        promedio_calificacion = calificaciones.objects.filter(
            restaurante_id=updated_restaurante
        ).aggregate(Avg('calificacion'))['calificacion__avg']

        updated_restaurante.calificacion_promedio = promedio_calificacion or 0 
        updated_restaurante.save()
        return Response(serializer.data)

class ImagenesView(ModelViewSet):
    queryset= Imagenes.objects.all()
    serializer_class= ImagenSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]
        
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
    queryset=calificaciones.objects.all()
    serializer_class=CalificacionSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]
    
    def list(self, request, *args, **kwargs):
        print("Request user:", request.user)  
        return super().list(request, *args, **kwargs)
    
class favoritosView(ModelViewSet):
    queryset=favoritos.objects.all()
    serializer_class=favoritosSerializer
    authentication_classes = [CookieAuthentication]
    permission_classes = [IsAuthenticated]
    
class calendarioView(ModelViewSet):
    queryset=calendario.objects.all()
    serializer_class=calendarioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

