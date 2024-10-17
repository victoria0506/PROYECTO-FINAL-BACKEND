from django.contrib.auth.hashers import make_password, check_password
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .models import Usuarios

def registro_user(data):
    data['contrasena'] = make_password(data['contrasena'])
    usuario= Usuarios.objects.create(**data)
    return usuario

def login_user(email, contrasena):
    try:
        usuario= Usuarios.objects.get(email=email)
        if check_password(contrasena, usuario.contrasena):
            return usuario
        else:
            return None
    except Usuarios.DoesNotExist:
        return None

def create_Authorization(usuario):
    payload = {
        'usuario_id': usuario.usuario_id,
        'exp': datetime.utcnow() + timedelta(minutes=30),
        'iat': datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm= 'HS256')

def create_Refresh(usuario):
    payload = {
        'usuario_id': usuario.usuario_id,
        'exp': datetime.utcnow() + timedelta(days= 7),
        'iat': datetime.utcnow(),
    }
    return jwt.encode(payload, settings.SECRET_KEY, algorithm= 'HS256')

def decode_jwt(token):
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithm=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None
