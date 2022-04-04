from django.db import models


class Todo(models.Model):
    Name = models.CharField(max_length=200)
    Due_Date = models.DateField(null=True)
    Completed = models.BooleanField(default=False)

    class Meta:
        ordering = ('Completed', 'pk')
