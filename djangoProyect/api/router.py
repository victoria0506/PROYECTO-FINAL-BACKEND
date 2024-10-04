from rest_framework.routers import DefaultRouter
from .views import TipouserView,UsuarioView,RestauranteView,CalificacionView,favoritosView, calendarioView, especialidadesView, CantonView, distritoView, RestaEspecilidadesView

router = DefaultRouter()

router.register(
    prefix='Tipousers', basename="Tipousers", viewset=TipouserView
)
router.register(
    prefix='users', basename="users", viewset=UsuarioView
)
router.register(
    prefix='canton', basename="canton", viewset=CantonView
)
router.register(
    prefix='distrito', basename="distrito", viewset=distritoView
)
router.register(
    prefix='admiRestaur', basename="admiRestaur", viewset=RestauranteView
)
router.register(
    prefix='especilidades', basename="especialidades", viewset=especialidadesView
)
router.register(
    prefix='RestaEspecialidades', basename='RestaEspecialidades', viewset=RestaEspecilidadesView
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