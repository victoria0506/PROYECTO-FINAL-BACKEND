from django.db import models

class Post(models.Model):
    usuario = models.CharField(max_length=255)
    contrasena = models.TextField()
    
# class Tipo_usuario(models.Model):
#     id_tipoUsuario= models.AutoField(primary_key=True),
#     descripcion= models.CharField(max_length=25)
    
# class usuarios(models.Model):
#     usuario_id = models.AutoField(primary_key=True),
#     nombre_usuario= models.CharField(max_length=100),
#     email= models.CharField(max_length=225,unique=True),
#     contrasena= models.CharField(max_length=200),
#     id_tipoUsuario= models.ForeignKey(Tipo_usuario)
    
# class restaurantes(models.Model):
#     restaurante_id= models.AutoField(primary_key=True),
#     nombre_restaurante= models.CharField(max_length=150),
#     ubicacion= models.CharField(max_length=255),
#     precio_promedio= models.DecimalField(max_digits=5, decimal_places=2),
#     especialidad= models.CharField(max_length=100),
#     calificacion_promedio= models.DecimalField(max_digits=5, decimal_places=1),
#     capacidad= models.IntegerField()
#     accesibilidad= models.BooleanField()
    
# class calificaciones(models.Model):
#     calificacion_id= models.AutoField(primary_key=True),
#     usuario_id= models.ForeignKey(usuarios)
#     restaurante_id= models.ForeignKey(restaurantes),
#     calificacion= models.DecimalField(max_digits=2, decimal_places=1)
    
# class favoritos(models.Model):
#     favorito_id= models.AutoField(primary_key=True),
#     usuario_id= models.ForeignKey(usuarios),
#     restaurante_id= models.ForeignKey(restaurantes),
    
    
# class calendario(models.Model):
#     calendario_id= models.AutoField(primary_key=True),
#     restaurante_id= models.ForeignKey(restaurantes),
#     dia= models.DateField(auto_now_add=True),
#     alta_demanada= models.BooleanField()
    
# class tipo_especialidad(models.Model):
#     id_especialidad= models.AutoField(primary_key=True),
#     descripcion= models.CharField(max_length=50)