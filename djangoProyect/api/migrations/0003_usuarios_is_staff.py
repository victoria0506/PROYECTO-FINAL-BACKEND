# Generated by Django 5.1.1 on 2024-10-28 16:13

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0002_calendario_calificaciones_canton_distrito_favoritos_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='usuarios',
            name='is_staff',
            field=models.BooleanField(default=False),
        ),
    ]