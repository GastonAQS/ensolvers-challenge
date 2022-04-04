from django.db import models


class Folder(models.Model):
    Name = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.Name


class Todo(models.Model):
    Name = models.CharField(max_length=200)
    Due_Date = models.DateField(null=True)
    Completed = models.BooleanField(default=False)
    Folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return self.Name

    class Meta:
        ordering = ('Completed', 'pk')
