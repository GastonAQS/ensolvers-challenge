# Generated by Django 4.0.3 on 2022-04-04 13:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0004_folder_todo_folder'),
    ]

    operations = [
        migrations.AlterField(
            model_name='todo',
            name='Due_Date',
            field=models.DateField(blank=True, null=True),
        ),
    ]
