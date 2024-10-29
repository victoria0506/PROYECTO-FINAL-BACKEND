from rest_framework.serializers import ModelSerializer
from .models import  TipoUsuario,Usuarios,restaurantes, calificaciones, favoritos, calendario, tipo_especialidad, Canton, distrito, RestaEspecialidades, Imagenes, Platillos_destacados
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
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
    
    def create(self, validated_data):
        email = validated_data.get('email')
        validated_data['is_staff'] = email == 'Admi@RestaurApp.com'
        validated_data['contrasena'] = make_password(validated_data['contrasena'])
        tipo_usuario_id = 2 if validated_data['is_staff'] else 1 
        validated_data['id_tipoUsuario'] = TipoUsuario.objects.get(id_tipoUsuario=tipo_usuario_id)
        user = Usuarios.objects.create(**validated_data)
        return user
    
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
      
class ImagenSerializer(ModelSerializer):
    class Meta:
        model= Imagenes
        fields = '__all__'
        
class PlatillosSeralizer(ModelSerializer):
    class Meta:
        model= Platillos_destacados
        fields= '__all__'
      
class especialidadSerializer(ModelSerializer):
    class Meta:
       model= tipo_especialidad
       fields= '__all__'
       
class RestaEspeciSerializer(ModelSerializer):
    class Meta:
        model= RestaEspecialidades
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

