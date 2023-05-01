from django.http import JsonResponse
from rest_framework.decorators import api_view
from django.contrib.auth import logout
from dotenv import load_dotenv
from .models import *
from .user_utilities import sign_up, log_in, who_am_i
from .list_utilities import get_list, add_to_list, remove_from_list


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




@api_view(['POST'])
def create_user_review(request):
    if request.user.is_authenticated:
        film_id = request.data.get('film_id')
        review = request.data.get('review_content')
        current_user = App_User.objects.get(email=request.user)
        print(f"Look Here:{current_user.id}")
        try:
            Custom_Reviews.objects.create(movie_id=film_id,review_content=review,user=current_user)
            return JsonResponse({'Review': f'Created review for {film_id}'})
        except Exception as e:
            print(str(e))
        
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def get_film_review(request):
    film_id = request.data.get('film_id')
    review_collection = Custom_Reviews.objects.filter(movie_id=film_id)
    review_cluster = []
    for view in review_collection:
        user_name = App_User.objects.get(id=view.user_id)
        review_cluster.append({
            'id' : view.id,
            'user_name' : user_name.display_name,
            'content' : view.review_content,
        })
    print(f"review_cluster: {review_cluster}")
    return JsonResponse({"review_cluster": review_cluster})


@api_view(['GET'])
def get_user_review(request):
    if request.user.is_authenticated:
        current_user = App_User.objects.get(email=request.user)
        review_collection = Custom_Reviews.objects.filter(user_id=current_user.id)
        review_cluster = []
        for view in review_collection:
            review_cluster.append({
                view.movie_id : view.review_content
            })
        print(review_cluster)
        return JsonResponse({"review_cluster": review_cluster})
    
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['PUT'])
def update_review(request):
    if request.user.is_authenticated:
        film_id = request.data.get('film_id')
        review = request.data.get('review')
        current_user = App_User.objects.get(email=request.user)
        try:
            Custom_Reviews.objects.filter(user_id=current_user.id,movie_id=film_id).update(review_content=review)
            return JsonResponse({'Review': f'Updated review for {film_id}. New review is {review}'})
        except Exception as e:
            print(str(e))
        
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def delete_review(request):
    if request.user.is_authenticated:
        film_id = request.data.get('film_id')
        current_user = App_User.objects.get(email=request.user)
        review = Custom_Reviews.objects.get(user_id=current_user.id,movie_id=film_id)
        try:
            removed_review = review.delete()
            return JsonResponse({'Review': f'Deleted review for the movie {film_id}.'})
        except Exception as e:
            print(str(e))

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def create_list(request):
    if request.user.is_authenticated:
        name_of_list = request.data.get('list_name')
        current_user = App_User.objects.get(email=request.user)
        Custom_Lists.objects.create(list_name=name_of_list,user=current_user)
        try:
            return JsonResponse({'List': f'Created list {name_of_list}.'})
        except Exception as e:
            print(str(e))

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['GET'])
def get_custom_list(request):
    if request.user.is_authenticated:
        list_type = 'watchlista'
        return get_list(request,list_type)
    
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def add_list(request):
    list_type = request.data.get('list_name')
    film_id = request.data.get('film_id')
    if request.user.is_authenticated:
        return add_to_list(request,list_type,film_id)

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def remove_list(request):
    list_type = request.data.get('list_name')
    film_id = request.data.get('film_id')
    if request.user.is_authenticated:
        return remove_from_list(request,list_type,film_id)
    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def delete_list(request):
    if request.user.is_authenticated:
        name_of_list = request.data.get('list_name')
        current_user = App_User.objects.get(email=request.user)
        list_content = Custom_Lists.objects.get(user_id=current_user.id,list_name=name_of_list)
        try:
            removed_list = list_content.delete()
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
def add_watchlist(request):
    film_id = request.data.get('film_id')
    list_type = 'watchlist'
    if request.user.is_authenticated:
        return add_to_list(request,list_type,film_id)

    else:
        return JsonResponse({'user': 'Not authenticated.'})


@api_view(['POST'])
def remove_watchlist(request):
    film_id = request.data.get('film_id')
    list_type = 'watchlist'
    if request.user.is_authenticated:
        return remove_from_list(request,list_type,film_id)
    else:
        return JsonResponse({'user': 'Not authenticated.'})

