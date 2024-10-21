import jwt
from django.shortcuts import get_object_or_404
from rest_framework.authentication import BaseAuthentication
from rest_framework.exceptions import AuthenticationFailed
from  .models import Usuarios

class CookieAuthentication(BaseAuthentication):
    def authenticate(self, request):
        print("Request headers:", request.headers)
        token = request.COOKIES.get("access_token")
        print("token: ", token)
        if not token:
            return None
        try:
            payload = jwt.decode(token, 'django-insecure-exie)fabh4*mldht)q9s7wr03o5dytm+9&sp_5z^*h=^)eygfu', algorithms=["HS256"])
            print("Decoded payload:", payload)
        except (jwt.ExpiredSignatureError, jwt.InvalidTokenError) as error:
            raise AuthenticationFailed({"detail": str(error)})
        
        user_id = payload.get("usuario_id")
        user = get_object_or_404(Usuarios, usuario_id= user_id)
        user.is_authenticated = True
        return (user, None)