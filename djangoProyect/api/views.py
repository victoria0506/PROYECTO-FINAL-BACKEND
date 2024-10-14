from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (TipoUserSerializer,UsuariosSerializer,
restaurantesSerializer,
CalificacionSerializer,favoritosSerializer,calendarioSerializer,especialidadSerializer, CantonSerializer, distritoSerializer, RestaEspeciSerializer)
from .models import TipoUsuario,Usuarios,restaurantes,calificaciones,favoritos,calendario,tipo_especialidad, Canton, distrito, RestaEspecialidades
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password


class TipouserView(ModelViewSet):
    queryset= TipoUsuario.objects.all()
    serializer_class= TipoUserSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class UsuarioView(ModelViewSet):
    queryset=Usuarios.objects.all()
    serializer_class= UsuariosSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
    def login(self, request):
        email = request.data.get('email')
        contrasena = request.data.get('contrasena')
        try:
            usuario = Usuarios.objects.get(email=email)
            if check_password(contrasena, usuario.contrasena):
                request.session['usuario_id'] = usuario.usuario_id
                return JsonResponse({"message": "Logueo Exitoso", "user_id": usuario.usuario_id}, status=200)
            else:
                return JsonResponse({"message": "Contraseña incorrecta"}, status=400)
        except Usuarios.DoesNotExist:
            return JsonResponse({"message": "Usuario no encontrado"}, status=404)

    def register(self, request):
        serializer = UsuariosSerializer(data=request.data)
        if serializer.is_valid():
            serializer.validated_data['contrasena'] = make_password(serializer.validated_data['contrasena'])
            serializer.save()
            return JsonResponse({"message": "Registro exitoso"}, status=201)
        return JsonResponse(serializer.errors, status=400)
        
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
    
    # def create(self, request, *args, **kwargs):
    #     user = request.user  
    #     if not user.is_authenticated:
    #         return Response(
    #             {'detail': 'Debes estar autenticado para añadir favoritos.'},
    #             status=status.HTTP_401_UNAUTHORIZED
    #         )
    #     try:
    #         usuario = Usuarios.objects.get(usuario_id=user.id)
    #     except Usuarios.DoesNotExist:
    #         return Response(
    #             {'detail': 'Usuario no encontrado.'},
    #             status=status.HTTP_404_NOT_FOUND
    #         )

    #     restaurante_id = request.data.get('restaurante_id')
    #     if favoritos.objects.filter(usuario_id=usuario, restaurante_id=restaurante_id).exists():
    #         return Response(
    #             {'detail': 'Este restaurante ya está en tus favoritos.'},
    #             status=status.HTTP_400_BAD_REQUEST
    #         )

    #     return super().create(request, *args, **kwargs)
    
class calendarioView(ModelViewSet):
    queryset=calendario.objects.all()
    serializer_class=calendarioSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]