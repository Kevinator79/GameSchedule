from email import message
from django.db import models

class Feedback(models.Model):
    email = models.CharField(max_length=50)
    firstname = models.CharField(max_length=50)
    surname = models.CharField(max_length=50)
    message = models.TextField()
