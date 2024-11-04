from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver

class TipoUsuario(models.Model):
    """Modelo que representa el tipo de usuario."""
    id_tipoUsuario = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=25)

class Usuarios(models.Model):
    """Modelo que representa a los usuarios del sistema."""
    usuario_id = models.AutoField(primary_key=True)
    nombre_usuario = models.CharField(max_length=100)
    email = models.CharField(max_length=225, unique=True)
    contrasena = models.CharField(max_length=200)
    id_tipoUsuario = models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, default=1)
    is_staff = models.BooleanField(default=False)

    def is_authenticated(self):
        """Método que indica que el usuario está autenticado."""
        return True 

class Canton(models.Model):
    """Modelo que representa un cantón."""
    id_canton = models.AutoField(primary_key=True)
    nombre_canton = models.CharField(max_length=100)

class Distrito(models.Model):
    """Modelo que representa un distrito."""
    id_distrito = models.AutoField(primary_key=True)
    nombre_distrito = models.CharField(max_length=100)
    id_canton = models.ForeignKey(Canton, on_delete=models.CASCADE, default=1)

class Restaurantes(models.Model):
    """Modelo que representa un restaurante."""
    restaurante_id = models.AutoField(primary_key=True)
    nombre_restaurante = models.CharField(max_length=150)
    precio_promedio = models.CharField(max_length=20)
    calificacion_promedio = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    capacidad = models.IntegerField()
    accesibilidad = models.BooleanField(default=True)
    descripcion = models.CharField(max_length=200)
    id_distrito = models.ForeignKey(Distrito, on_delete=models.CASCADE)
    horario_apertura = models.TimeField(null=True, blank=True) 
    horario_cierre = models.TimeField(null=True, blank=True) 
    activo = models.BooleanField(default=True)
    latitud_map = models.FloatField(null=True, blank=True) 
    longitud_map = models.FloatField(null=True, blank=True) 

    def actualizar_promedio(self):
        """Actualiza la calificación promedio del restaurante basado en las calificaciones registradas."""
        promedio_calificacion = Calificaciones.objects.filter(restaurante_id=self).aggregate(promedio=Avg('calificacion'))['promedio']
        if promedio_calificacion is not None:
            self.calificacion_promedio = promedio_calificacion
            self.save()
        else:
            print(f"No se encontraron calificaciones para el restaurante_id {self.restaurante_id}")

class Imagenes(models.Model):
    """Modelo que almacena imágenes relacionadas con un restaurante."""
    id_imagen = models.AutoField(primary_key=True)
    url_img = models.URLField(max_length=500)
    url_header = models.URLField(max_length=500, null=True, blank=True)  
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)
    tipo_imagen = models.CharField(max_length=20, choices=[("perfil", "Perfil"), ("encabezado", "Encabezado"), ("galeria", "Galería")], null=True, blank=True)

class PlatillosDestacados(models.Model):
    """Modelo que almacena los platillos destacados de un restaurante."""
    id_platillo = models.AutoField(primary_key=True)
    url_platillo_1 = models.URLField(max_length=500, null=True, blank=True)
    url_platillo_2 = models.URLField(max_length=500, null=True, blank=True)
    url_platillo_3 = models.URLField(max_length=500, null=True, blank=True)
    url_platillo_4 = models.URLField(max_length=500, null=True, blank=True)
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)

class TipoEspecialidad(models.Model):
    """Modelo que representa el tipo de especialidad de un platillo."""
    id_especialidad = models.AutoField(primary_key=True)
    descripcion = models.CharField(max_length=50)

class RestaEspecialidades(models.Model):
    """Modelo que relaciona restaurantes con sus especialidades."""
    id_RestaEspeciali = models.AutoField(primary_key=True)
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)
    id_especialidad = models.ForeignKey(TipoEspecialidad, on_delete=models.CASCADE)

class Calificaciones(models.Model):
    """Modelo que representa las calificaciones dadas por los usuarios a los restaurantes."""
    calificacion_id = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)
    calificacion = models.DecimalField(max_digits=2, decimal_places=1)

    def __str__(self):
        """Devuelve una representación legible de la calificación."""
        return f"Calificación {self.calificacion} por {self.usuario_id} para {self.restaurante_id}"

class Favoritos(models.Model):
    """Modelo que representa los restaurantes favoritos de los usuarios."""
    favorito_id = models.AutoField(primary_key=True)
    usuario_id = models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)

class Calendario(models.Model):
    """Modelo que representa un calendario de eventos para restaurantes."""
    TIPO_DIA_CHOICES = [
        ('alta_demanda', 'Alta Demanda'),
        ('evento', 'Evento'),
        ('normal', 'Normal'),
    ]
    calendario_id = models.AutoField(primary_key=True)
    dia_evento = models.DateField()  
    dia_semana = models.CharField(max_length=9, null=True, blank=True)  
    tipo = models.CharField(max_length=20, choices=TIPO_DIA_CHOICES, default='normal')
    nota = models.TextField(null=True, blank=True) 
    restaurante = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)

class MenuRestaurantes(models.Model):
    """Modelo que almacena los menús de los restaurantes."""
    id_menu = models.AutoField(primary_key=True)
    pagina_1 = models.URLField(max_length=500, null=True, blank=True)
    pagina_2 = models.URLField(max_length=500, null=True, blank=True)
    pagina_3 = models.URLField(max_length=500, null=True, blank=True)
    pagina_4 = models.URLField(max_length=500, null=True, blank=True)
    pagina_5 = models.URLField(max_length=500, null=True, blank=True)
    pagina_6 = models.URLField(max_length=500, null=True, blank=True)
    pagina_7 = models.URLField(max_length=500, null=True, blank=True)
    pagina_8 = models.URLField(max_length=500, null=True, blank=True)
    restaurante_id = models.ForeignKey(Restaurantes, on_delete=models.CASCADE)

    