# Generated by Django 5.1.1 on 2024-10-30 16:07

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_restaurantes_latitud_restaurantes_longitud'),
    ]

    operations = [
        migrations.RenameField(
            model_name='restaurantes',
            old_name='latitud',
            new_name='latitud_map',
        ),
        migrations.RenameField(
            model_name='restaurantes',
            old_name='longitud',
            new_name='longitud_map',
        ),
    ]