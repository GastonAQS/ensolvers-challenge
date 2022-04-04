from todo.models import Folder
from todo.serializers import FolderSerializerOverview, FolderSerializerDetailed
from django.shortcuts import get_object_or_404
from django.db.models import Count


def get_folders():
    all_folders = Folder.objects.all().annotate(todo_count=Count('todo'))
    serialized_folders = FolderSerializerOverview(all_folders, many=True)
    return serialized_folders.data

def get_folder(name):
    folder = get_object_or_404(Folder,Name=name)
    folder_serializer = FolderSerializerDetailed(folder)
    return folder_serializer.data


def new_folder(folder_data):
    folder = FolderSerializerOverview(data=folder_data)
    folder.is_valid(raise_exception=True)
    folder.save()
    return folder.data


def remove_folder(name):
    folder = get_object_or_404(Folder,Name=name)
    folder.delete()
    return
