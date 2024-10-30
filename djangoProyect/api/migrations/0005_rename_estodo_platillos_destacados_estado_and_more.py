# Generated by Django 5.1.1 on 2024-10-30 15:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_platillos_destacados_id_imagen_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='platillos_destacados',
            old_name='estodo',
            new_name='estado',
        ),
        migrations.RenameField(
            model_name='platillos_destacados',
            old_name='url_img_platillo',
            new_name='url_platillo_1',
        ),
        migrations.AddField(
            model_name='platillos_destacados',
            name='url_platillo_2',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='platillos_destacados',
            name='url_platillo_3',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
        migrations.AddField(
            model_name='platillos_destacados',
            name='url_platillo_4',
            field=models.URLField(blank=True, max_length=500, null=True),
        ),
    ]