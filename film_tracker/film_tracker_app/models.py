from django.db import models
from django.contrib.auth.models import AbstractUser
from django.apps import apps


class App_User(AbstractUser):
    email = models.EmailField(blank = False, null = False, unique = True)
    username = models.CharField(max_length = 255, null = False, blank = False)
    dob = models.DateField(null = False, blank = False)
    watchlist_Movie_IDs = models.TextField()
   
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
  
    def __str__(self):
        return f"{self.username} | {self.email}"
  
apps.register_model(App_User, model=AbstractUser)
