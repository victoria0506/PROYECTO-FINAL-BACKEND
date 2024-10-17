from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (TipoUserSerializer,UsuariosSerializer,
restaurantesSerializer,
CalificacionSerializer,favoritosSerializer,calendarioSerializer,especialidadSerializer, CantonSerializer, distritoSerializer, RestaEspeciSerializer, ImagenSerializer, PlatillosSeralizer)
from .models import TipoUsuario,Usuarios,restaurantes,calificaciones,favoritos,calendario,tipo_especialidad, Canton, distrito, RestaEspecialidades, Imagenes, Platillos_destacados
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from .auth import registro_user, login_user, create_Authorization, create_Refresh

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
        print(f"Email: {email}, Contraseña: {contrasena}")
        
        usuario = login_user(email, contrasena)
        if usuario:
            access_token = create_Authorization(usuario)
            refresh_token = create_Refresh(usuario)
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
    
    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)
    
class ImagenesView(ModelViewSet):
    queryset= Imagenes.objects.all()
    serializer_class= ImagenSerializer
    authentication_classes = [TokenAuthentication]
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
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class favoritosView(ModelViewSet):
    queryset=favoritos.objects.all()
    serializer_class=favoritosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class calendarioView(ModelViewSet):
    queryset=calendario.objects.all()
    serializer_class=calendarioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]