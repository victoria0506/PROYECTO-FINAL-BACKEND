# Generated by Django 5.1.1 on 2024-09-25 22:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0006_favoritos'),
    ]

    operations = [
        migrations.CreateModel(
            name='calendario',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('alta_demanada', models.BooleanField()),
            ],
        ),
    ]