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

#/user/ directs here
urlpatterns = [
    path('', views.user_capabilities, name='user_capabilities'),
    
    path('api/create_review/', views.create_user_review, name='create_user_review/'),
    path('api/get_review/', views.get_film_review, name='get_film_review'),
    path('api/get_user_review/', views.get_user_review, name='get_user_review'),
    path('api/update_review/', views.update_review, name='update_review'),
    path('api/delete_review/', views.delete_review, name='delete_review'),
    
    path('api/create_list/', views.create_list, name='create_list'),
    path('api/get_custom_list/', views.get_custom_list, name='get_custom_list/'),
    path('api/add_list/', views.add_list, name='add_list'),
    path('api/remove_list/', views.remove_list, name='remove_list'),
    path('api/delete_list/', views.delete_list, name='delete_list'),
    
    path('api/get_watchlist/', views.get_watchlist, name='get_watchlist'),
    path('api/add_watchlist/', views.add_watchlist, name='add_watchlist'),
    path('api/remove_watchlist/', views.remove_watchlist, name='remove_watchlist'),
]
