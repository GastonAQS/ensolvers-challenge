from todo.serializers import TodoSerializer
from todo.models import Todo
from django.shortcuts import get_object_or_404


def get_all_todos():
    all_todos = Todo.objects.all()
    serialized_todos = TodoSerializer(all_todos, many=True)
    return serialized_todos.data


def create_todo(todo):
    serialized_todo = TodoSerializer(data=todo)
    serialized_todo.is_valid(raise_exception=True)
    serialized_todo.save()
    return serialized_todo.data


def get_todo(pk):
    todo = get_object_or_404(Todo, pk=pk)
    serialized_todo = TodoSerializer(todo)
    return serialized_todo.data


def update_todo(pk, todo_data):
    todo_object = get_object_or_404(Todo, pk=pk)
    serialized_todo = TodoSerializer(
        instance=todo_object, data=todo_data, partial=True)
    serialized_todo.is_valid(raise_exception=True)
    serialized_todo.save()
    return serialized_todo.data


def delete_todo(pk):
    todo = get_object_or_404(Todo, pk=pk)
    todo.delete()
