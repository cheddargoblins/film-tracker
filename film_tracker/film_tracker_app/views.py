from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from .utilities import sign_up, log_in, who_am_i
import requests
from requests_oauthlib import OAuth1
from dotenv import load_dotenv
import os
import pprint
import json
from datetime import datetime


pp = pprint.PrettyPrinter(indent=1, depth=3)
load_dotenv()


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

#70? Uses left
def get_movie_times(request):
    today = datetime.now()
    headers = {
        'client':'STUD_284',
        #The below 2 lines are commented out so I dont accident use up all of the key's uses
        # 'x-api-key':os.environ['movieglu_priv_key'],
        # 'authorization':os.environ['movieglu_authorization'],
        'territory':'US',
        'api-version':'v200',
        # 'geolocation':	Your location in format lat;lng, e.g. 52.47;-1.93. Below is VA Beach
        'geolocation':'36.8516;75.9792',
        # 'device-datetime':	yyyy-mm-ddThh:mm:ss.sssZ (ISO 8601 format, e.g. 2018-09-14T08:30:17.360Z)
        'device-datetime':today.isoformat()
    }
    url = f"https://api-gate2.movieglu.com/cinemasNearby/"
    response = requests.get(url, headers=headers)
    response_content = json.loads(response.content)
    return JsonResponse({"data":response_content})
    # return render(request, "product.html", data)