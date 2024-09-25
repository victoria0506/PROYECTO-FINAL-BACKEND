from rest_framework.serializers import ModelSerializer
from .models import Post,TipoUsuario, Usuarios, restaurantes, calificaciones, favoritos, calendario, tipo_especialidad

class PostSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = '__all__'

class TipoUserSerializer(ModelSerializer):
    class Meta:
        model = TipoUsuario
        fields = '__all__'

    
class UsuariosSerializer(ModelSerializer):
    class Meta:
        model = Usuarios,
        fields= '__all__'
        
    def create(self, validated_data):
        user = Usuarios(**validated_data)
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class restaurantesSerializer(ModelSerializer):
    Model: restaurantes
    fields= '__all__'
    
class CalificacionSerializer(ModelSerializer):
    Model: calificaciones
    fields= '__all__'
    
class favoritosSerializer(ModelSerializer):
    Model: favoritos
    fields= '__all__'
    
class calendarioSerializer(ModelSerializer):
    Model: calendario
    fields= '__all__'
    
class especialidadSerializer(ModelSerializer):
    Model: tipo_especialidad
    fields= '__all__'