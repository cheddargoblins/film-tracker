from .models import *
from django.http import JsonResponse



def get_list(request, list_type):
    current_user = App_User.objects.get(email=request.user)
    if list_type == 'watchlist':
        list_content = current_user.watchlist_movie_ids
        return JsonResponse({f"{current_user.display_name}'s Watchlist": f"{list_content}"})
    else:
        try:
            list_content = Custom_Lists.objects.get(user_id=current_user.id)
            return JsonResponse({f'{list_content.list_name}': f'{list_content.list_of_movie_ids}'})
        except Exception as e:
            print(str(e))



#,film_id
def add_to_list(request,list_type,film_id):
    current_user = App_User.objects.get(email=request.user)
    if list_type == 'watchlist':
        if film_id in current_user.watchlist_movie_ids:
            return JsonResponse({'watchlist': f'{film_id} is ALREADY in watchlist. Current watchlist is following movies {current_user.watchlist_movie_ids}'})
        else:
            try:
                current_user.watchlist_movie_ids.append(film_id)
                current_user.save()
            except Exception as e:
                print(str(e))
            
            return JsonResponse({'watchlist': f'Watchlist ADDED {film_id} to list. Current watchlist is following movies {current_user.watchlist_movie_ids}'})
    else:
        list_content = Custom_Lists.objects.get(user_id=current_user.id)

        if film_id in list_content.list_of_movie_ids:
            return JsonResponse({f'{list_content.list_name}': f'{film_id} is ALREADY in {list_content.list_name}. {list_content.list_name} currently has the following movies {list_content.list_of_movie_ids}'})
        else:
            try:
                list_content.list_of_movie_ids.append(film_id)
                list_content.save()
                return JsonResponse({f'{list_content.list_name}': f'{list_content.list_of_movie_ids}'})
            except Exception as e:
                print(str(e))


#,film_id
def remove_from_list(request,list_type,film_id):
    current_user = App_User.objects.get(email=request.user)
    if list_type == 'watchlist':
        if film_id in current_user.watchlist_movie_ids:
            try:
                current_user.watchlist_movie_ids.remove(film_id)
                current_user.save()
            except Exception as e:
                print(str(e))
            
            return JsonResponse({'watchlist': f'Watchlist REMOVED {film_id} from list. Current watchlist is following movies {current_user.watchlist_movie_ids}'})
        else:
            return JsonResponse({'watchlist': f'{film_id} was NOT in your watchlist. Current watchlist is following movies {current_user.watchlist_movie_ids}'})

    else:
        list_content = Custom_Lists.objects.get(user_id=current_user.id)

        if film_id in list_content.list_of_movie_ids:
            try:
                list_content.list_of_movie_ids.remove(film_id)
                list_content.save()
            except Exception as e:
                print(str(e))
            
            return JsonResponse({f'{list_content.list_name}': f'{list_content.list_name} REMOVED {film_id} from list. {list_content.list_name} currently has the following movies {list_content.list_of_movie_ids}'})
        else:
            return JsonResponse({f'{list_content.list_name}': f'{film_id} was NOT in {list_content.list_name}. {list_content.list_name} currently has the following movies: {list_content.list_of_movie_ids}'})

