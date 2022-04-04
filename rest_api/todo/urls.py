from django.urls import path
from todo.views import *

urlpatterns = [
    path("login/",Login.as_view()),
    path("folder/", TodosFolder.as_view()),
    path("folder/<str:folder_name>/", TodosFolderItem.as_view()),
    path("folder/<str:folder_name>/<int:id>/", TodoItem.as_view()),
]
