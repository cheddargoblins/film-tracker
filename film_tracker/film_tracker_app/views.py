from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from .utilities import sign_up, log_in, who_am_i


@api_view(['POST', 'GET'])
def user_capabilities(request):
    if request.method == 'POST':
        if request.user.is_authenticated:
            try:
                logout(request)
                return JsonResponse({"logout":True})
            except Exception as e:
                print(e)
                return JsonResponse({"logout":False})
        elif 'display_name' not in request.data:
            return log_in(request)
        else:
            return sign_up(request.data)
    elif request.method == 'GET':
        return who_am_i(request)