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
from django.urls import path
from . import views

#/movie/ directs here
urlpatterns = [
    path('details/', views.movieData, name='movieData'),
    path('search/', views.movieSearcher, name='movieSearcher'),
    
    path('getIMDBLists/', views.imdb_movie_lists, name='getPoster'),
    path('getPoster/', views.getPoster, name='getPoster'),
    path('getTimes/', views.get_movie_times, name='getPoster'),
]
