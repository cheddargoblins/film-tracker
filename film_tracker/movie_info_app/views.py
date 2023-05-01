from django.http import JsonResponse
from rest_framework.decorators import api_view
from dotenv import load_dotenv
from datetime import datetime
import requests
import os
import json


load_dotenv()


@api_view(['POST'])
def movieData(request):
    movie_request = request.data.get('film_id')
    endpoint = f"https://imdb-api.com/en/API/Title/{os.environ['imdb_priv_key']}/{movie_request}/Wikipedia"
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({"data":response_content})


@api_view(['POST'])
def movieSearcher(request):
    movie_title = request.data.get('movie_title')
    endpoint = f"https://imdb-api.com/en/API/SearchMovie/{os.environ['imdb_priv_key']}/{movie_title}"
    response = requests.get(endpoint, headers={'Accept': 'application/json'})
    response_content = json.loads(response.content)
    return JsonResponse({"results":response_content['results']})

@api_view(['GET'])
def imdb_movie_lists(request):
    top250 = f"https://imdb-api.com/en/API/Top250Movies/{os.environ['imdb_priv_key']}"
    response = requests.get(top250)
    response_top250 = json.loads(response.content)
    
    newMovies = f"https://imdb-api.com/en/API/ComingSoon/{os.environ['imdb_priv_key']}"
    response = requests.get(newMovies)
    response_newMovies = json.loads(response.content)
    
    return JsonResponse({"Top_250":response_top250,"Upcoming_Movies":response_newMovies['items']})

@api_view(['POST'])
def getPoster(request):
    movie_request = request.data.get('film_id')
    endpoint = f"https://imdb-api.com/en/API/Posters/{os.environ['imdb_priv_key']}/{movie_request}"
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    data = {
        'title':response_content["title"],
        'poster':response_content["posters"][0]["link"]
        }
    return JsonResponse({"data":data})




def get_movie_times(request):
    today = datetime.now()
    #Sandbox API Header
    headers = {
        'client':'STUD_284',
        'x-api-key':'iBZGfWAA2gR8NYu1T49325fOHMag73J2QJYCnGM3',
        'authorization':'Basic U1RVRF8yODRfWFg6UER4cEpwM3N3M2Uw',
        'territory':'XX',
        'api-version':'v200',
        'geolocation':'-22.0;14.0',
        'device-datetime':today.isoformat()
    }
    #Real API Header
    # headers = {
    #     'client':'STUD_284',
    #     #The below 2 lines are commented out so I dont accident use up all of the key's uses
    #     'x-api-key':os.environ['movieglu_priv_key'],
    #     'authorization':os.environ['movieglu_authorization'],
    #     'territory':'US',
    #     'api-version':'v200',
    #     # 'geolocation':	Your location in format lat;lng, e.g. 52.47;-1.93. Below is VA Beach
    #     'geolocation':'36.8516;75.9792',
    #     # 'device-datetime':	yyyy-mm-ddThh:mm:ss.sssZ (ISO 8601 format, e.g. 2018-09-14T08:30:17.360Z)
    #     'device-datetime':today.isoformat()
    # }
    #url for finding cinemas based on geolocation
    # url = f"https://api-gate2.movieglu.com/cinemasNearby/"
    date = today.strftime("%Y-%m-%d")
    #url for getting showtimes by using a cinema's id
    url = f"https://api-gate2.movieglu.com/cinemaShowTimes/?cinema_id=8930&date={date}"
    print(url)
    response = requests.get(url, headers=headers)
    response_content = json.loads(response.content)
    return JsonResponse({"data":response_content})
