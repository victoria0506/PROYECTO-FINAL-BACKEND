# Generated by Django 5.1.1 on 2024-11-02 18:45

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='restaurantes',
            name='coordenadas',
        ),
    ]