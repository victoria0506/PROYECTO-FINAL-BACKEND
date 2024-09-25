from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from .models import Post
from .serializers import PostSerializer
from django.contrib.auth import authenticate
from .serializers import PostSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication

class PostUserView(ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]
    

