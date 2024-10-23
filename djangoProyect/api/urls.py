from django.urls import path, include
from .router import router
from django.urls import path
from rest_framework_simplejwt.views import (TokenRefreshView,)
from .views import GenerateImageKitAuth

urlpatterns = [
    path('', include(router.urls)),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('ImagenApi/', GenerateImageKitAuth.as_view(), name='Imagen_Api')
]