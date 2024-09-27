from rest_framework.serializers import ModelSerializer
from .models import  TipoUsuario,Usuarios,ubicacion,restaurantes, calificaciones, favoritos, calendario, tipo_especialidad

class TipoUserSerializer(ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'

class UsuariosSerializer(ModelSerializer):
    class Meta:
        model = Usuarios
        fields= '__all__'
        
    def registro(self, validated_data):
        user = Usuarios(**validated_data)
        user.set_password(validated_data['contrasena']) 
        user.save()
        return user
        
        
class ubicacionSerializer(ModelSerializer):
    class Meta:
        model = ubicacion
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