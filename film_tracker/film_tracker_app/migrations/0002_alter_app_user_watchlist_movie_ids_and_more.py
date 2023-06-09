# Generated by Django 4.2 on 2023-04-24 04:40

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('film_tracker_app', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='app_user',
            name='watchlist_movie_ids',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True, null=True), blank=True, default=list, size=None),
        ),
        migrations.AlterField(
            model_name='custom_lists',
            name='list_of_movie_ids',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.TextField(blank=True, null=True), blank=True, default=list, size=None),
        ),
    ]
