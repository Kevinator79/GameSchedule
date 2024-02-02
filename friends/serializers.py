from rest_framework import serializers
from .models import Friend
from .models import FriendRequest

class FriendSerializer(serializers.ModelSerializer):
    class Meta:
        model = Friend
        fields = ('oneId', 'twoId')

class FriendRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = FriendRequest
        fields = ('senderId', 'receiverId', 'accepted')
