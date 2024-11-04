import jwt
from django.shortcuts import get_object_or_404
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from .models import Usuarios

class CookieAuthentication(BaseAuthentication):
    """
    Clase para autenticar usuarios usando un token JWT de las cookies.
    """
    def authenticate(self, request):
        # Obtiene el token de las cookies.
        token = request.COOKIES.get("access_token")
        if not token:
            return None  # No hay token, no se puede autenticar.

        try:
            # Decodifica el token.
            payload = jwt.decode(token, 'django-insecure-exie)fabh4*mldht)q9s7wr03o5dytm+9&sp_5z^*h=^)eygfu', algorithms=["HS256"])
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as error:
            raise AuthenticationFailed({"detail": str(error)})  # Token inválido o expirado.
        
        # Obtiene el ID del usuario del payload.
        user_id = payload.get("usuario_id")
        # Busca el usuario en la base de datos.
        user = get_object_or_404(Usuarios, usuario_id=user_id)
        
        # Marca al usuario como autenticado.
        user.is_authenticated = True
        
        return (user, None)  # Devuelve el usuario y None.

    