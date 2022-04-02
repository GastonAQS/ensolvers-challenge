from rest_framework import serializers
from todo.models import Todo
from datetime import datetime


class TodoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Todo
        fields = "__all__"

    def validate_Due_Date(self, value):
        if value < datetime.now():
            raise serializers.ValidationError(
                "Due date cannot be lesser than current date")
        return value
