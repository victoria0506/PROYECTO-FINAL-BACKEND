from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.viewsets import ModelViewSet
from .serializers import (TipoUserSerializer,UsuariosSerializer,ubicacionSerializer,
restaurantesSerializer,
CalificacionSerializer,favoritosSerializer,calendarioSerializer,especialidadSerializer)
from .models import TipoUsuario,Usuarios,ubicacion,restaurantes,calificaciones,favoritos,calendario,tipo_especialidad
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

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
    
    def login(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)
          
class ubicacionView(ModelViewSet):
    queryset=ubicacion.objects.all()
    serializer_class= ubicacionSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
class RestauranteView(ModelViewSet):
    queryset= restaurantes.objects.all()
    serializer_class= restaurantesSerializer
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
    
class especialidadesView(ModelViewSet):
    queryset=tipo_especialidad.objects.all()
    serializer_class=especialidadSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    
