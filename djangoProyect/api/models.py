from django.db import models
    
class TipoUsuario(models.Model):
    id_tipoUsuario= models.AutoField(primary_key=True)
    descripcion= models.CharField(max_length=25)
    
class Usuarios(models.Model):
    usuario_id = models.AutoField(primary_key=True)
    nombre_usuario= models.CharField(max_length=100)
    email= models.CharField(max_length=225,unique=True)
    contrasena= models.CharField(max_length=200)
    id_tipoUsuario= models.ForeignKey(TipoUsuario, on_delete=models.CASCADE, default=1)
    
class ubicacion(models.Model):
    id_ubicacion= models.AutoField(primary_key=True)
    canton= models.CharField(max_length=100)
    distrito= models.CharField(max_length=100)
    direccion_exacta= models.CharField(max_length=250)
    
class restaurantes(models.Model):
    restaurante_id= models.AutoField(primary_key=True)
    nombre_restaurante= models.CharField(max_length=150)
    precio_promedio= models.DecimalField(max_digits=5, decimal_places=2)
    especialidad= models.CharField(max_length=100)
    calificacion_promedio= models.DecimalField(max_digits=5, decimal_places=1)
    capacidad= models.IntegerField()
    accesibilidad= models.BooleanField()
    id_ubicacion= models.ForeignKey(ubicacion, on_delete=models.CASCADE)
    
class calificaciones(models.Model):
    calificacion_id= models.AutoField(primary_key=True)
    usuario_id= models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    calificacion= models.DecimalField(max_digits=2, decimal_places=1)
    
class favoritos(models.Model):
    favorito_id= models.AutoField(primary_key=True)
    usuario_id= models.ForeignKey(Usuarios, on_delete=models.CASCADE)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    
class calendario(models.Model):
    calendario_id= models.AutoField(primary_key=True)
    restaurante_id= models.ForeignKey(restaurantes, on_delete=models.CASCADE)
    dia= models.DateField(auto_now_add=True)
    alta_demanada= models.BooleanField()
    
class tipo_especialidad(models.Model):
    id_especialidad= models.AutoField(primary_key=True)
    descripcion= models.CharField(max_length=50)