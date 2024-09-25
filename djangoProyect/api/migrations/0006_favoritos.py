# Generated by Django 5.1.1 on 2024-09-25 22:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_calificaciones'),
    ]

    operations = [
        migrations.CreateModel(
            name='favoritos',
            fields=[
                ('favorito_id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
    ]