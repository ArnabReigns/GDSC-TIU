# Generated by Django 4.0.4 on 2022-07-27 19:12

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_session'),
    ]

    operations = [
        migrations.RenameField(
            model_name='session',
            old_name='Facilator',
            new_name='facilator',
        ),
    ]