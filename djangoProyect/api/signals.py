from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Calificaciones  

@receiver(post_save, sender=Calificaciones)
def actualizar_promedio_signal(sender, instance, created, **kwargs):
    """
    Señal que se activa después de guardar una calificación.

    Si se ha creado o actualizado una calificación, se actualiza el promedio
    del restaurante asociado.

    :param instance: La instancia de Calificaciones que se ha guardado.
    """
    if instance.restaurante_id:  # Si hay un restaurante asociado
        instance.restaurante_id.actualizar_promedio()  # Actualiza el promedio de calificaciones

