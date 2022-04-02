# Generated by Django 4.0.3 on 2022-04-02 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Todo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('Name', models.CharField(max_length=200)),
                ('Due_Date', models.DateTimeField(null=True)),
                ('Completed', models.BooleanField(default=False)),
            ],
        ),
    ]