"""
URL configuration for film_tracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.http import HttpResponse
from django.conf import settings
import os


def send_the_index(request):
    path_to_index = os.path.join(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")), "static", "index.html")
    the_index = open(path_to_index)
    return HttpResponse(the_index)

urlpatterns = [
    path('', send_the_index),
    path('admin/', admin.site.urls),
    path('user/', include('film_tracker_app.urls')),
    path('movie/', include('movie_info_app.urls')),
]
