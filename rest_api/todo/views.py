
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from todo.todo_service import create_todo, get_todo, update_todo, delete_todo
from todo.todo_folder_service import get_folders, new_folder, get_folder, remove_folder
from rest_framework.authentication import BasicAuthentication

class Login(APIView):
    authentication_classes = [
        BasicAuthentication,
    ]
    def post(self, request, format=None):
        return Response(data={"message": "logged in successfully"}, status=status.HTTP_200_OK)

class TodoItem(APIView):
    authentication_classes = [
        BasicAuthentication,
    ]

    def get(self, request, id, folder_name,format=None):
        todo = get_todo(id, folder_name)
        return Response(data=todo)

    def put(self, request, id, folder_name,format=None):
        todo = update_todo(id, folder_name,request.data)
        return Response(data=todo)

    def delete(self, request, id, folder_name,format=None):
        delete_todo(id, folder_name)
        return Response({"message": "object deleted successfuly"})


class TodosFolder(APIView):
    authentication_classes = [
        BasicAuthentication,
    ]


    def get(self, request, format=None):
        folders = get_folders()
        return Response(data=folders)

    def post(self, request, format=None):
        created_folder = new_folder(request.data)
        return Response(data=created_folder, status=status.HTTP_201_CREATED)


class TodosFolderItem(APIView):
    authentication_classes = [
        BasicAuthentication,
    ]
    
    def get(self, request, folder_name,format=None):
        folders = get_folder(folder_name)
        return Response(data=folders)

    def post(self, request, folder_name, format=None):
        created_todo = create_todo(request.data,folder_name)
        return Response(data=created_todo, status=status.HTTP_201_CREATED)

    def delete(self, request, folder_name,format=None):
        remove_folder(folder_name)
        return Response({"message": "object deleted successfuly"})
