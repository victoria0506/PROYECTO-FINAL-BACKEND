from django.contrib.auth.hashers import make_password, check_password
import jwt
from datetime import datetime, timedelta
from django.conf import settings
from .models import Usuarios
from rest_framework_simplejwt.tokens import RefreshToken

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
    # payload = {
    #      ['usuario_id']: usuario.usuario_id,
    #     'exp': datetime.utcnow() + timedelta(days= 7),
    #     'iat': datetime.utcnow(),
    # }
    # token = jwt.encode(payload, settings.SECRET_KEY, algorithm= 'HS256')
    # return str(token)
    refresh = RefreshToken.for_user(usuario)
    refresh['usuario_id'] = usuario.usuario_id
    return str(refresh)

def decode_jwt(token):
    try:
        payload = jwt.decode(token,settings.SECRET_KEY, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        raise Exception("El token ha expirado.")
    except jwt.InvalidTokenError:
        raise Exception("Token inválido.")
