from django.urls import path
from todo.views import *

urlpatterns = [
    path("todo/", Todos.as_view()),
    path("todo/<int:id>/", TodoItem.as_view()),
    path("todo/folder/", TodosFolder.as_view()),
    #path("todo/folder/<string:folder_name>", TodosFolderItem.as_view()),
]
