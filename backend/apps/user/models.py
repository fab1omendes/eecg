from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):

    photo = models.URLField(blank=True, null=True)

    name = models.CharField(max_length=255, blank=True, null=True)

    birth_date = models.DateField(blank=True, null=True)

    email = models.EmailField(unique=True)

    password = models.CharField(max_length=255)

    profession = models.CharField(max_length=255, blank=True, null=True)

    organization = models.CharField(max_length=255, blank=True, null=True)
    
    def __str__(self):
        return self.email
