# Generated by Django 5.1.1 on 2024-10-30 16:09

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_rename_estodo_platillos_destacados_estado_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='platillos_destacados',
            name='descripcion',
        ),
        migrations.RemoveField(
            model_name='platillos_destacados',
            name='estado',
        ),
        migrations.RemoveField(
            model_name='platillos_destacados',
            name='nombre',
        ),
        migrations.RemoveField(
            model_name='platillos_destacados',
            name='precio',
        ),
    ]