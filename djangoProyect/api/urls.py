from django.urls import path, include
from .router import router
from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView,) #para refrescar el token al hacer login
from .views import GenerateImageKitAuth, ImagenesView, favoritosView

urlpatterns = [
    path('', include(router.urls)),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('ImagenApi/', GenerateImageKitAuth.as_view(), name='Imagen_Api'),
    path('api/Imagenes/', ImagenesView.as_view({'post': 'create'}), name='imagenes-list'),
    path('favoritos/<int:usuario_id>/', favoritosView.as_view({"get": "retrieve"}), name="favoritos")
]