from rest_framework.routers import DefaultRouter
from .views import TipouserView,RegisterView,LoginView,RestauranteView,CalificacionView,favoritosView, calendarioView, especialidadesView, CantonView, distritoView, RestaEspecilidadesView, ImagenesView, PlatillosView, MenuView

router = DefaultRouter()

router.register(
    prefix='Tipousers', basename="Tipousers", viewset=TipouserView
)
router.register(
    prefix='usersLogin', basename="login", viewset=LoginView
)
router.register(
    prefix='usersRegistro', basename="register", viewset=RegisterView
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
    prefix='favoritos', viewset=favoritosView
)
router.register(
    prefix='calendario', basename="calendario", viewset=calendarioView
)
router.register(
    prefix= 'Imagenes', basename= "Imagenes", viewset=ImagenesView
)
router.register(
    prefix= 'Platillos', basename= "platillosDesta", viewset=PlatillosView
)
router.register(
    prefix='menu', basename='menu', viewset=MenuView
)