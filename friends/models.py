from django.db import models
from django.contrib.auth.models import User

class Friend(models.Model):
    oneId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='oneId')
    twoId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='twoId')

class FriendRequest(models.Model):
    senderId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='senderId')
    receiverId = models.ForeignKey(User, on_delete=models.CASCADE, related_name='receiverId')
    accepted = models.BooleanField(default=False)