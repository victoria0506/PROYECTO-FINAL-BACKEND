# signals.py
from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import calificaciones  # Importa el modelo calificaciones

@receiver(post_save, sender=calificaciones)
def actualizar_promedio_signal(sender, instance, created, **kwargs):
    if instance.restaurante_id:  # Asegúrate de que este campo no sea nulo
        instance.restaurante_id.actualizar_promedio()
