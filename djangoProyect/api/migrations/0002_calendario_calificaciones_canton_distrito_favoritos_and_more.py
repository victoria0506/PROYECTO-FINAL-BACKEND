# Generated by Django 5.1.1 on 2024-10-30 02:08

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='calendario',
            fields=[
                ('calendario_id', models.AutoField(primary_key=True, serialize=False)),
                ('dia', models.DateField()),
                ('alta_demanada', models.BooleanField(default=True)),
                ('nota', models.TextField(blank=True, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='calificaciones',
            fields=[
                ('calificacion_id', models.AutoField(primary_key=True, serialize=False)),
                ('calificacion', models.DecimalField(decimal_places=1, max_digits=2)),
            ],
        ),
        migrations.CreateModel(
            name='Canton',
            fields=[
                ('id_canton', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_canton', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='distrito',
            fields=[
                ('id_distrito', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_distrito', models.CharField(max_length=100)),
                ('id_canton', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.canton')),
            ],
        ),
        migrations.CreateModel(
            name='favoritos',
            fields=[
                ('favorito_id', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='Imagenes',
            fields=[
                ('id_imagen', models.AutoField(primary_key=True, serialize=False)),
                ('url_img', models.URLField(max_length=500)),
                ('url_header', models.URLField(blank=True, max_length=500, null=True)),
                ('tipo_imagen', models.CharField(blank=True, choices=[('perfil', 'Perfil'), ('encabezado', 'Encabezado'), ('galeria', 'Galería')], max_length=20, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Platillos_destacados',
            fields=[
                ('id_platillo', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=50)),
                ('descripcion', models.CharField(max_length=50)),
                ('precio', models.DecimalField(decimal_places=3, max_digits=7)),
                ('estodo', models.BooleanField(default=True)),
                ('id_imagen', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.imagenes')),
            ],
        ),
        migrations.CreateModel(
            name='RestaEspecialidades',
            fields=[
                ('id_RestaEspeciali', models.AutoField(primary_key=True, serialize=False)),
            ],
        ),
        migrations.CreateModel(
            name='restaurantes',
            fields=[
                ('restaurante_id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_restaurante', models.CharField(max_length=150)),
                ('precio_promedio', models.CharField(max_length=20)),
                ('calificacion_promedio', models.DecimalField(decimal_places=1, default=0, max_digits=3)),
                ('capacidad', models.IntegerField()),
                ('accesibilidad', models.BooleanField(default=True)),
                ('descripcion', models.CharField(max_length=200)),
                ('id_distrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.distrito')),
            ],
        ),
        migrations.CreateModel(
            name='tipo_especialidad',
            fields=[
                ('id_especialidad', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=50)),
            ],
        ),
        migrations.CreateModel(
            name='TipoUsuario',
            fields=[
                ('id_tipoUsuario', models.AutoField(primary_key=True, serialize=False)),
                ('descripcion', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='Usuarios',
            fields=[
                ('usuario_id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_usuario', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=225, unique=True)),
                ('contrasena', models.CharField(max_length=200)),
                ('is_staff', models.BooleanField(default=False)),
                ('id_tipoUsuario', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.tipousuario')),
            ],
        ),
        migrations.DeleteModel(
            name='Post',
        ),
        migrations.AddField(
            model_name='restaespecialidades',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='platillos_destacados',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='imagenes',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='favoritos',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='calificaciones',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='calendario',
            name='restaurante_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes'),
        ),
        migrations.AddField(
            model_name='restaespecialidades',
            name='id_especialidad',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.tipo_especialidad'),
        ),
        migrations.AddField(
            model_name='favoritos',
            name='usuario_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios'),
        ),
        migrations.AddField(
            model_name='calificaciones',
            name='usuario_id',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios'),
        ),
    ]
