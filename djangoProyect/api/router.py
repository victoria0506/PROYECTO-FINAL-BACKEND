from rest_framework.routers import DefaultRouter
from .views import PostUserView

router_post = DefaultRouter()
router_post.register(
    prefix='users', basename="users", viewset=PostUserView
)