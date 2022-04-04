
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from todo.todo_service import get_all_todos, create_todo, get_todo, update_todo, delete_todo
from todo.todo_folder_service import get_folders, new_folder


class Todos(APIView):
    def get(self, request, format=None):
        todos = get_all_todos()
        return Response(data=todos)

    def post(self, request, format=None):
        created_todo = create_todo(request.data)
        return Response(data=created_todo, status=status.HTTP_201_CREATED)


class TodoItem(APIView):
    def get(self, request, id, format=None):
        todo = get_todo(id)
        return Response(data=todo)

    def put(self, request, id, format=None):
        todo = update_todo(id, request.data)
        return Response(data=todo)

    def delete(self, request, id, format=None):
        delete_todo(id)
        return Response({"message": "object deleted successfuly"})


class TodosFolder(APIView):
    def get(self, request, format=None):
        folders = get_folders()
        return Response(data=folders)

    def post(self, request, format=None):
        created_folder = new_folder(request.data)
        return Response(data=created_folder, status=status.HTTP_201_CREATED)
