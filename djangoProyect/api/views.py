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
import requests
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
import base64

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
    
@method_decorator(csrf_exempt, name='dispatch')
class ImagenesView(ModelViewSet):
    queryset= Imagenes.objects.all()
    serializer_class= ImagenSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    # def create(self, request, *args, **kwargs):
    #     if 'img' not in request.FILES:
    #         return Response({'error': 'No se encontró la imagen.'}, status=status.HTTP_400_BAD_REQUEST)
    #     imagen = request.FILES['img']
    #     url = "https://ik.imagekit.io/sox1oxatj/restaurapp"
    #     private_key = "private_Ecz2WMJrZqKhiwgwzN+lULisEFI="
    #     encoded_key = base64.b64encode(f"{private_key}:".encode()).decode()
    #     headers = {
    #         "Authorization": f"Basic {encoded_key}"
    #     }
    #     files = {
    #         'file': imagen,
    #         'fileName': imagen.name,
    #     }
    #     try:
    #         response = requests.post(url, headers=headers, files=files)
    #         if response.status_code == 200:
    #             image_url = response.json().get('url')
    #             restaurante_id = request.data.get('restaurante_id')
    #             nueva_imagen = Imagenes(url_img=image_url, restaurante=restaurante_id)
    #             nueva_imagen.save()
    #             return Response({'url_img': image_url}, status=status.HTTP_201_CREATED)
    #         elif response.status_code == 403:
    #             return Response(
    #                 {'error': 'Unauthorized request. Please check your private key or permissions.'},
    #                 status=status.HTTP_403_FORBIDDEN
    #             )
    #         else:
    #             return Response(
    #                 {'error': 'Error al subir la imagen.', 'details': response.json()},
    #                 status=response.status_code
    #             )
    #     except requests.exceptions.RequestException as e:
    #         return Response({'error': f'Request failed: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
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