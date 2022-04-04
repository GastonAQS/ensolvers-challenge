from django.db import models


class Folder(models.Model):
    Name = models.CharField(max_length=40, unique=True)

    def __str__(self) -> str:
        return self.Name


class Todo(models.Model):
    Name = models.CharField(max_length=40)
    Due_Date = models.DateField(null=True,blank=True)
    Completed = models.BooleanField(default=False)
    Folder = models.ForeignKey(Folder, on_delete=models.CASCADE, null=True)

    def __str__(self) -> str:
        return self.Name

    class Meta:
        ordering = ('Completed', 'pk')
