from django.contrib.auth.hashers import make_password, check_password
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .models import Usuarios
from rest_framework_simplejwt.tokens import RefreshToken

def registro_user(data):
    # Encripta la contraseña antes de guardarla en la base de datos
    data['contrasena'] = make_password(data['contrasena'])
    # Crea un nuevo usuario en la base de datos.
    usuario= Usuarios.objects.create(**data)
    return usuario

def login_user(email, contrasena):
    try:
        # Crea un nuevo usuario en la base de datos.
        usuario= Usuarios.objects.get(email=email)
        # Verifica si la contraseña proporcionada es correcta.
        if check_password(contrasena, usuario.contrasena):
            return usuario
        else:
            return None
    except Usuarios.DoesNotExist:
        return None # Si el usuario no existe, devuelve None

def create_Authorization(usuario):
    # Define el payload del token con el ID del usuario y fechas de expiración.
    payload = {
        'usuario_id': usuario.usuario_id,
        'exp': datetime.utcnow() + timedelta(minutes=30),
        'iat': datetime.utcnow(),
    }
    # Codifica el token utilizando la clave secreta.
    return jwt.encode(payload, settings.SECRET_KEY, algorithm= 'HS256')

def create_Refresh(usuario):
     # Crea un nuevo token de actualización para el usuario.
    refresh = RefreshToken.for_user(usuario)
    refresh['usuario_id'] = usuario.usuario_id # Añade el ID del usuario al token
    return str(refresh)  #Devuelve el token de actualización como cadena.

def decode_jwt(token):
    try:
        payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("El token ha expirado.")
    except jwt.InvalidTokenError:
        raise Exception("Token inválido.")
