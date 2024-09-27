from rest_framework.routers import DefaultRouter
from .views import TipouserView,UsuarioView,ubicacionView,RestauranteView,CalificacionView,favoritosView, calendarioView, especialidadesView

router = DefaultRouter()

router.register(
    prefix='Tipousers', basename="Tipousers", viewset=TipouserView
)

router.register(
    prefix='users', basename="users", viewset=UsuarioView
)

router.register(
    prefix='ubicacion', basename="ubicacion", viewset=ubicacionView
)

router.register(
    prefix='admiRestaur', basename="admiRestaur", viewset=RestauranteView
)

router.register(
    prefix='califiRestaur', basename="califiRestaur", viewset=CalificacionView
)

router.register(
    prefix='favoritos', basename="favoritos", viewset=favoritosView
)

router.register(
    prefix='calendario', basename="calendario", viewset=calendarioView
)

router.register(
    prefix='especilidades', basename="especialidades", viewset=especialidadesView
)
