from rest_framework import serializers
from todo.models import Todo

from datetime import date
from datetime import timedelta
from django.apps import apps
todoCfg = apps.get_app_config('todo')


class TodoSerializer(serializers.ModelSerializer):
    Due_Date = serializers.DateField(
        format='%d/%m/%Y', required=False, allow_null=True)
    Expires_Soon = serializers.SerializerMethodField()
    Expired = serializers.SerializerMethodField()

    class Meta:
        model = Todo
        fields = "__all__"

    def validate_Due_Date(self, value):
        if value and value < date.today():
            raise serializers.ValidationError(
                "Due date should be great or equal than current date")
        return value

    def get_Expires_Soon(self, instance):
        today = date.today()
        yesterday = today + timedelta(days=todoCfg.expires_soon_delta_in_days)
        return instance.Due_Date and instance.Due_Date <= yesterday

    def get_Expired(self, instance):
        today = date.today()
        return instance.Due_Date and not instance.Completed and instance.Due_Date < today
