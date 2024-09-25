from django.urls import path, include
from .router import router_post

urlpatterns = [
    path('', include(router_post.urls))
]