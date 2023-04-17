from .models import App_User
from django.http import JsonResponse
from django.contrib.auth import authenticate, login
from django.core.serializers import serialize
import json

def sign_up(data):
    email = data['email']
    password = data['password']
    display_name = data['display_name']
    dob = data['dob']
    super_user = False
    staff = False
    if 'super' in data:
        super_user = data['super']
    if 'staff' in data:
        staff = data['staff']
    try:
        new_user = App_User.objects.create_user(username = email, email = email, display_name = display_name, password = password, dob = dob, is_superuser = super_user, is_staff = staff)
        new_user.save()
        return JsonResponse({"success":True})
    except Exception as e:
        print(e)
        return JsonResponse({"success": False})
  
def log_in(request):
    email = request.data['email']
    password = request.data['password']
    print(request._request)
    user = authenticate(username = email , password = password)
    if user is not None and user.is_active:
        try:
            login(request._request, user)
            return JsonResponse({'login':True, 'email': user.email, 'display_name':user.display_name})
        except Exception as e:
            print(e)
            return JsonResponse({'login':False})
    return JsonResponse({'login':False, 'active_status': user.is_active})


def who_am_i(request):
    if request.user.is_authenticated:
        user_info = serialize("json",  [request.user], fields = ['display_name', 'email'])
        user_info_workable = json.loads(user_info)
        return JsonResponse(user_info_workable[0]['fields'])
    else:
        return JsonResponse({"user":None})
