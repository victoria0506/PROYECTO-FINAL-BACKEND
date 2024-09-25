# Generated by Django 5.1.1 on 2024-09-25 22:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_usuarios'),
    ]

    operations = [
        migrations.CreateModel(
            name='restaurantes',
            fields=[
                ('restaurante_id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_restaurante', models.CharField(max_length=150)),
                ('ubicacion', models.CharField(max_length=255)),
                ('precio_promedio', models.DecimalField(decimal_places=2, max_digits=5)),
                ('especialidad', models.CharField(max_length=100)),
                ('calificacion_promedio', models.DecimalField(decimal_places=1, max_digits=5)),
                ('capacidad', models.IntegerField()),
                ('accesibilidad', models.BooleanField()),
            ],
        ),
    ]
