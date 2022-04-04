from todo.models import Folder
from todo.serializers import FolderSerializer
from django.shortcuts import get_object_or_404
from django.db.models import Count


def get_folders():
    all_folders = Folder.objects.all().annotate(todo_count=Count('todo'))
    serialized_folders = FolderSerializer(all_folders, many=True)
    return serialized_folders.data


def new_folder(folder_data):
    folder = FolderSerializer(data=folder_data)
    folder.is_valid(raise_exception=True)
    folder.save()
    return folder.data


def remove_folder(name):
    folder = get_object_or_404(Folder,)
