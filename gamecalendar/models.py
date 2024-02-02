# Generally, each model maps to a single database table
from django.db import models
from django.contrib.auth.models import User

class Post(models.Model):
    userId = models.ForeignKey(User, on_delete=models.CASCADE)
    gameName = models.CharField(max_length=100)
    date = models.CharField(max_length=50)
    time = models.CharField(max_length=50)

class Filter(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    filterName = models.CharField(max_length=100)

class PostRequest(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    senderId = models.ForeignKey(User, on_delete=models.CASCADE)
    accepted = models.BooleanField(default=False)

class PostMember(models.Model):
    postId = models.ForeignKey(Post, on_delete=models.CASCADE)
    userId = models.ForeignKey(User, on_delete=models.CASCADE)


