from django.db import models


class Todo(models.Model):
    Name = models.CharField(max_length=200)
    Due_Date = models.DateTimeField(null=True)
    Completed = models.BooleanField(default=False)
