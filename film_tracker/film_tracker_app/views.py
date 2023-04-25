from django.shortcuts import render, redirect
from django.http import JsonResponse, HttpResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from dotenv import load_dotenv
from datetime import datetime
import requests
import json
import pprint
from requests_oauthlib import OAuth1
import os
from .models import *
from .user_utilities import sign_up, log_in, who_am_i
from .list_utilities import get_list, add_to_list, remove_from_list


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




@api_view(['POST'])
#,film_id,review
def create_user_review(request):
    if request.user.is_authenticated:
        film_id='tt1375666'
        review='I hated it'
        # current_user = App_User.objects.filter(email=request.user).exists()
        current_user = App_User.objects.get(email=request.user)
        print(f"Look Here:{current_user.id}")
        try:
            Custom_Reviews.objects.create(movie_id=film_id,review_content=review,user=current_user)
            return JsonResponse({'Review': f'Created review for {film_id}'})
        except Exception as e:
            print(str(e))
        
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['GET'])
#,film_id,id_user
def get_user_review(request):
    film_id='tt1375666'
    # current_user = App_User.objects.filter(email=request.user).exists()
    review = Custom_Reviews.objects.get(movie_id=film_id)
    print(f"Look Here:{review.review_content}")
    
    return JsonResponse({'Review': review.review_content})


@api_view(['PUT'])
#,film_id,review
def update_review(request):
    if request.user.is_authenticated:
        film_id='tt1375666'
        review='I actually LOVED it'
        current_user = App_User.objects.get(email=request.user)
        # review_content = Custom_Reviews.objects.get(user_id=current_user.id,movie_id=film_id)
        # print(f"Look Here:{review_content}")
        try:
            Custom_Reviews.objects.filter(user_id=current_user.id,movie_id=film_id).update(review_content=review)
            return JsonResponse({'Review': f'Updated review for {film_id}. New review is {review}'})
        except Exception as e:
            print(str(e))
        
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,film_id
def delete_review(request):
    film_id='tt1375666'
    if request.user.is_authenticated:
        current_user = App_User.objects.get(email=request.user)
        review = Custom_Reviews.objects.get(user_id=current_user.id,movie_id=film_id)
        try:
            removed_review = review.delete()
            print(f"LOOK HERE 2222: {removed_review}")
            return JsonResponse({'Review': f'Deleted review for the movie {film_id}.'})
        except Exception as e:
            print(str(e))

    else:
        return JsonResponse({'user': 'Not authenticated.'})




@api_view(['POST'])
#,name_of_list,movie_list
def create_list(request):
    name_of_list='test_list2'
    movie_list=['tt1375666','tt6718170','tt11358390']
    if request.user.is_authenticated:
        # current_user = App_User.objects.filter(email=request.user).exists()
        current_user = App_User.objects.get(email=request.user)
        Custom_Lists.objects.create(list_name=name_of_list,list_of_movie_ids=movie_list,user=current_user)
        try:
            return JsonResponse({'List': f'Created list {name_of_list} which has the following movies {movie_list}'})
        except Exception as e:
            print(str(e))

    else:
        return JsonResponse({'user': 'Not authenticated.'})


#,list_type
@api_view(['GET'])
def get_custom_list(request):
    if request.user.is_authenticated:
        list_type = 'watchlista'
        return get_list(request,list_type)
    
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,film_id
def add_list(request):
    list_type = 'watchlista'
    film_id='tt14537248'
    if request.user.is_authenticated:
        return add_to_list(request,list_type,film_id)

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,film_id
def remove_list(request):
    list_type = 'watchlista'
    film_id='tt14537248'
    if request.user.is_authenticated:
        return remove_from_list(request,list_type,film_id)
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,name_of_list
def delete_list(request):
    if request.user.is_authenticated:
        name_of_list='test_list'
        current_user = App_User.objects.get(email=request.user)
        list_content = Custom_Lists.objects.get(user_id=current_user.id,list_name=name_of_list)
        print(f"LOOK HERE: {list_content}")
        try:
            removed_list = list_content.delete()
            print(f"LOOK HERE 2222: {removed_list}")
            return JsonResponse({'List': f'Deleted list {name_of_list}.'})
        except Exception as e:
            print(str(e))

    else:
        return JsonResponse({'user': 'Not authenticated.'})




@api_view(['GET'])
def get_watchlist(request):
    if request.user.is_authenticated:
        list_type = 'watchlist'
        return get_list(request,list_type)
    
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,film_id
def add_watchlist(request):
    #film_id = request.data.get('film_id')
    list_type = 'watchlist'
    film_id='tt14537248'
    if request.user.is_authenticated:
        return add_to_list(request,list_type,film_id)

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
#,film_id
def remove_watchlist(request):
    list_type = 'watchlist'
    film_id='tt14537248'
    if request.user.is_authenticated:
        return remove_from_list(request,list_type,film_id)
    else:
        return JsonResponse({'user': 'Not authenticated.'})

