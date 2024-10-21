from django.urls import path, include
from .router import router
# from rest_framework_simplejwt.views import (TokenRefreshView)

urlpatterns = [
    path('', include(router.urls)),
    # path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
]