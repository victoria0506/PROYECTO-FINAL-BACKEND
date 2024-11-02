from rest_framework.serializers import ModelSerializer
from .models import  TipoUsuario,Usuarios,restaurantes, calificaciones, favoritos, calendario, tipo_especialidad, Canton, distrito, RestaEspecialidades, Imagenes, Platillos_destacados, menu_restaurantes
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
    platillo_urls = serializers.SerializerMethodField()
    class Meta:
        model= Platillos_destacados
        fields= '__all__'
        
    def get_platillo_urls(self, obj):
        urls = []
        if obj.url_platillo_1:
            urls.append({"imgSrc": obj.url_platillo_1})
        if obj.url_platillo_2:
            urls.append({"imgSrc": obj.url_platillo_2})
        if obj.url_platillo_3:
            urls.append({"imgSrc": obj.url_platillo_3})
        if obj.url_platillo_4:
            urls.append({"imgSrc": obj.url_platillo_4})
        return urls
      
class especialidadSerializer(ModelSerializer):
    class Meta:
       model= tipo_especialidad
       fields= '__all__'
       
class RestaEspeciSerializer(ModelSerializer):
    class Meta:
        model= RestaEspecialidades
        fields= '__all__'
        
class CalificacionSerializer(ModelSerializer):
    promedio = serializers.FloatField(read_only=True)
    class Meta:
      model= calificaciones
      fields= '__all__'
      
    def validate_calificacion(self, value):
        if value < 0.0 or value > 5.0:
            raise serializers.ValidationError("La calificación debe estar entre 0.0 y 5.0.")
        return value
    
class favoritosSerializer(ModelSerializer):
    class Meta:
      model= favoritos
      fields= '__all__'
    
class calendarioSerializer(ModelSerializer):
    class Meta:
      model= calendario
      fields= '__all__'

class menuSerializer(ModelSerializer):
    class Meta:
      model= menu_restaurantes
      fields= '__all__'
      
      