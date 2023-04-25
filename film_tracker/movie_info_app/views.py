from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
import requests
from dotenv import load_dotenv
import os
import pprint
import json


pp = pprint.PrettyPrinter(indent=1, depth=3)
load_dotenv()


def movieData(request, movie_request):
    #The actual movie_request will be passing along a Movie ID that it gets from either the search page or the home page.
    # The below reassignment is just used to ensure that I can access the desired API infomation.
    movie_request = 'tt1375666'
    endpoint = f"https://imdb-api.com/en/API/Title/{os.environ['imdb_priv_key']}/{movie_request}/Wikipedia"
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    #Below data variable will be removed when React portion is created and response_content is passed to the frontend.
    data = {
        'film_id':response_content["id"],
        'title':response_content["title"],
        'year':response_content["year"],
        'poster':response_content["image"],
        'release_date':response_content["releaseDate"],
        'running_time':response_content["runtimeStr"],
        'plot':response_content["plot"],
        'directors':response_content["directors"],
        'actors':response_content["stars"],
        'genres':response_content["genres"],
        'rating':response_content["contentRating"],
        }
    print(f"Movie Data is {data}")
    return JsonResponse({"data":response_content})
    # return render(request, "movie_details.html", data)


def movieSearcher(request, movie_title):
    endpoint = f"https://imdb-api.com/en/API/SearchMovie/{os.environ['imdb_priv_key']}/{movie_title}"
    response = requests.get(endpoint)
    response_content = json.loads(response.content)
    return JsonResponse({"data":response_content['results']})
    # return render(request, "movie_search.html", data)


def imdb_movie_lists(request):
    top250 = f"https://imdb-api.com/en/API/Top250Movies/{os.environ['imdb_priv_key']}"
    response = requests.get(top250)
    response_top250 = json.loads(response.content)
    
    newMovies = f"https://imdb-api.com/en/API/ComingSoon/{os.environ['imdb_priv_key']}"
    response = requests.get(newMovies)
    response_newMovies = json.loads(response.content)
    
    return JsonResponse({"Top_250":response_top250,"Upcoming_Movies":response_newMovies['items']})