# Generated by Django 4.0.3 on 2022-04-04 01:28

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('todo', '0002_alter_todo_due_date'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='todo',
            options={'ordering': ('Completed', 'pk')},
        ),
    ]