from rest_framework.serializers import ModelSerializer
from .models import  TipoUsuario,Usuarios,restaurantes, calificaciones, favoritos, calendario, tipo_especialidad, Canton, distrito
from rest_framework import serializers

class TipoUserSerializer(ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'

class UsuariosSerializer(ModelSerializer):
    class Meta:
        model = Usuarios
        fields= '__all__'
        
    def validate_email(self, value):
        if Usuarios.objects.filter(email=value).exists():
            raise serializers.ValidationError("Este correo ya está registrado.")
        return value

    def validate_nombre_usuario(self, value):
        if Usuarios.objects.filter(nombre_usuario=value).exists():
            raise serializers.ValidationError("Este nombre de usuario ya está registrado.")
        return value
    
class CantonSerializer(ModelSerializer):
    class Meta:
        model= Canton
        fields= '__all__'
        
class distritoSerializer(ModelSerializer):
    class Meta:
        model= distrito
        fields= '__all__'
    
class restaurantesSerializer(ModelSerializer):
    class Meta:
      model= restaurantes
      fields= '__all__'
    
class CalificacionSerializer(ModelSerializer):
    class Meta:
      model= calificaciones
      fields= '__all__'
    
class favoritosSerializer(ModelSerializer):
    class Meta:
      model= favoritos
      fields= '__all__'
    
class calendarioSerializer(ModelSerializer):
    class Meta:
      model= calendario
      fields= '__all__'
    
class especialidadSerializer(ModelSerializer):
    class Meta:
       model= tipo_especialidad
       fields= '__all__'