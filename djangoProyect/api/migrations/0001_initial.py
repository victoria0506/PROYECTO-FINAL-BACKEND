

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Canton',
            fields=[
                ('id_canton', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_canton', models.CharField(max_length=100)),
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
            name='distrito',
            fields=[
                ('id_distrito', models.AutoField(primary_key=True, serialize=False)),
                ('nombre_distrito', models.CharField(max_length=100)),
                ('id_canton', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='api.canton')),
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
                ('horario_apertura', models.TimeField(blank=True, null=True)),
                ('horario_cierre', models.TimeField(blank=True, null=True)),
                ('activo', models.BooleanField(default=True)),
                ('latitud_map', models.FloatField(blank=True, null=True)),
                ('longitud_map', models.FloatField(blank=True, null=True)),
                ('id_distrito', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.distrito')),
            ],
        ),
        migrations.CreateModel(
            name='Platillos_destacados',
            fields=[
                ('id_platillo', models.AutoField(primary_key=True, serialize=False)),
                ('url_platillo_1', models.URLField(blank=True, max_length=500, null=True)),
                ('url_platillo_2', models.URLField(blank=True, max_length=500, null=True)),
                ('url_platillo_3', models.URLField(blank=True, max_length=500, null=True)),
                ('url_platillo_4', models.URLField(blank=True, max_length=500, null=True)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
            ],
        ),
        migrations.CreateModel(
            name='menu_restaurantes',
            fields=[
                ('id_menu', models.AutoField(primary_key=True, serialize=False)),
                ('pagina_1', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_2', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_3', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_4', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_5', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_6', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_7', models.URLField(blank=True, max_length=500, null=True)),
                ('pagina_8', models.URLField(blank=True, max_length=500, null=True)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
            ],
        ),
        migrations.CreateModel(
            name='Imagenes',
            fields=[
                ('id_imagen', models.AutoField(primary_key=True, serialize=False)),
                ('url_img', models.URLField(max_length=500)),
                ('url_header', models.URLField(blank=True, max_length=500, null=True)),
                ('tipo_imagen', models.CharField(blank=True, choices=[('perfil', 'Perfil'), ('encabezado', 'Encabezado'), ('galeria', 'Galería')], max_length=20, null=True)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
            ],
        ),
        migrations.CreateModel(
            name='calendario',
            fields=[
                ('calendario_id', models.AutoField(primary_key=True, serialize=False)),
                ('dia', models.DateField()),
                ('tipo', models.CharField(choices=[('alta_demanda', 'Alta Demanda'), ('evento', 'Evento'), ('normal', 'Normal')], default='normal', max_length=20)),
                ('nota', models.TextField(blank=True, null=True)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
            ],
        ),
        migrations.CreateModel(
            name='RestaEspecialidades',
            fields=[
                ('id_RestaEspeciali', models.AutoField(primary_key=True, serialize=False)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
                ('id_especialidad', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.tipo_especialidad')),
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
        migrations.CreateModel(
            name='favoritos',
            fields=[
                ('favorito_id', models.AutoField(primary_key=True, serialize=False)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
        migrations.CreateModel(
            name='calificaciones',
            fields=[
                ('calificacion_id', models.AutoField(primary_key=True, serialize=False)),
                ('calificacion', models.DecimalField(decimal_places=1, max_digits=2)),
                ('restaurante_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.restaurantes')),
                ('usuario_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.usuarios')),
            ],
        ),
    ]
