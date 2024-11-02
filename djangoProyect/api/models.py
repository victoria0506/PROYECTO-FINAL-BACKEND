from django.db import models
from django.db.models import Avg
from django.db.models.signals import post_save
from django.dispatch import receiver

class TipoUsuario(models.Model):
    id_tipoUsuario= models.AutoField(primary_key=True)
    descripcion= models.CharField(max_length=25)
    
class Usuarios(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre_usuario= models.CharField(max_length=100)
    email= models.CharField(max_length=225,unique=True)
    contrasena= models.CharField(max_length=200)
    id_tipoUsuario= models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, default=1)
    is_staff = models.BooleanField(default=False)
    
    def is_authenticated(self):
        return True 
    
class Canton(models.Model):
    id_canton= models.AutoField(primary_key=True)
    nombre_canton= models.CharField(max_length=100)
    
class distrito(models.Model):
    id_distrito= models.AutoField(primary_key=True)
    nombre_distrito= models.CharField(max_length=100)
    id_canton=models.ForeignKey(Canton, on_delete=models.CASCADE, default=1)

class restaurantes(models.Model):
    restaurante_id= models.AutoField(primary_key=True)
    nombre_restaurante= models.CharField(max_length=150)
    precio_promedio = models.CharField(max_length=20)
    calificacion_promedio = models.DecimalField(max_digits=3, decimal_places=1, default=0)
    capacidad= models.IntegerField()
    accesibilidad= models.BooleanField(default=True)
    descripcion = models.CharField(max_length=200)
    id_distrito= models.ForeignKey(distrito, on_delete=models.CASCADE)
    horario_apertura = models.TimeField(null=True, blank=True) 
    horario_cierre = models.TimeField(null=True, blank=True) 
    activo = models.BooleanField(default=True)
<<<<<<< HEAD
    coordenadas = models.JSONField(null=True, blank=True)
    
    def actualizar_promedio(self):
        """Actualiza la calificación promedio del restaurante."""
        promedio_calificacion = calificaciones.objects.filter(
            restaurante_id=self
        ).aggregate(promedio=Avg('calificacion'))['promedio']
        
        if promedio_calificacion is not None:
            self.calificacion_promedio = promedio_calificacion
            self.save()  # Guardar el nuevo promedio en el restaurante
        else:
            print(f"No se encontraron calificaciones para el restaurante_id {self.restaurante_id}")
=======
    latitud_map = models.FloatField(null=True, blank=True) 
    longitud_map = models.FloatField(null=True, blank=True) 

>>>>>>> d93d726f8212100b6f3f9d956933f604ce52983a

class Imagenes(models.Model):
    id_imagen = models.AutoField(primary_key=True)
    url_img = models.URLField(max_length=500)
    url_header = models.URLField(max_length=500, null=True, blank=True)  
    restaurante_id = models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    tipo_imagen = models.CharField(max_length=20,choices=[("perfil", "Perfil"), ("encabezado", "Encabezado"), ("galeria", "Galería")],null=True,blank=True)

class Platillos_destacados(models.Model):
    id_platillo= models.AutoField(primary_key=True)
    url_platillo_1 = models.URLField(max_length=500,null=True, blank=True)
    url_platillo_2 = models.URLField(max_length=500,null=True, blank=True)
    url_platillo_3 = models.URLField(max_length=500,null=True, blank=True)
    url_platillo_4 = models.URLField(max_length=500,null=True, blank=True)
    restaurante_id = models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    
class tipo_especialidad(models.Model):
    id_especialidad= models.AutoField(primary_key=True)
    descripcion= models.CharField(max_length=50)
    
class RestaEspecialidades(models.Model):
    id_RestaEspeciali= models.AutoField(primary_key=True)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    id_especialidad= models.ForeignKey(tipo_especialidad, on_delete=models.CASCADE)
    
class calificaciones(models.Model):
    calificacion_id= models.AutoField(primary_key=True)
    usuario_id= models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    calificacion= models.DecimalField(max_digits=2, decimal_places=1)
    
    def __str__(self):
        return f"Calificación {self.calificacion} por {self.usuario_id} para {self.restaurante_id}"
    
    
class favoritos(models.Model):
    favorito_id= models.AutoField(primary_key=True)
    usuario_id= models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    
class calendario(models.Model):
    TIPO_DIA_CHOICES = [
        ('alta_demanda', 'Alta Demanda'),
        ('evento', 'Evento'),
        ('normal', 'Normal'),
    ]
    calendario_id = models.AutoField(primary_key=True)
    dia = models.DateField()
    tipo = models.CharField(max_length=20, choices=TIPO_DIA_CHOICES, default='normal')
    nota = models.TextField(null=True, blank=True) 
    restaurante_id = models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    
    
class menu_restaurantes(models.Model):
    id_menu = models.AutoField(primary_key=True)
    pagina_1 = models.URLField(max_length=500,null=True, blank=True)
    pagina_2 = models.URLField(max_length=500,null=True, blank=True)
    pagina_3 = models.URLField(max_length=500,null=True, blank=True)
    pagina_4 = models.URLField(max_length=500,null=True, blank=True)
    pagina_5 = models.URLField(max_length=500,null=True, blank=True)
    pagina_6 = models.URLField(max_length=500,null=True, blank=True)
    pagina_7 = models.URLField(max_length=500,null=True, blank=True)
    pagina_8 = models.URLField(max_length=500,null=True, blank=True)
    restaurante_id = models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    