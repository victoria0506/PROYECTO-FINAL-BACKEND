# Generated by Django 5.1.1 on 2024-10-31 06:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0010_remove_platillos_destacados_nombre_platillo'),
    ]

    operations = [
        migrations.AddField(
            model_name='restaurantes',
            name='horario_apertura',
            field=models.TimeField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='restaurantes',
            name='horario_cierre',
            field=models.TimeField(blank=True, null=True),
        ),
    ]
