from django.db import models
from django.contrib.auth.models import AbstractUser
from django.apps import apps
from django.contrib.postgres.fields import ArrayField


class App_User(AbstractUser):
    email = models.EmailField(blank = False, null = False, unique = True)
    display_name = models.CharField(max_length = 255, null = False, blank = False)
    dob = models.DateField(null = False, blank = False)
    watchlist_movie_ids = ArrayField(base_field=models.TextField(null=True, blank=True), default=list, blank=True)
   
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = [email,display_name,dob]
  
apps.register_model(App_User, model=AbstractUser)


class Custom_Lists(models.Model):
    list_name = models.CharField(max_length = 255, null = False, blank = False)
    list_of_movie_ids = ArrayField(base_field=models.TextField(null=True, blank=True), default=list, blank=True)
    user = models.ForeignKey(App_User, on_delete=models.CASCADE, related_name="lists")

    def __str__(self):
       return f"{self.list_name} List: {self.list_of_movie_ids}"


class Custom_Reviews(models.Model):
    movie_id = models.CharField(max_length = 255, null = False, blank = False)
    review_content = models.TextField(null = False, blank = False)
    user = models.ForeignKey(App_User, on_delete=models.CASCADE, related_name="reviews")

    def __str__(self):
       return f"{self.movie_id} Review: {self.review_content}"