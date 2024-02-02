from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Friend, FriendRequest
from .serializers import FriendRequestSerializer

@api_view(['GET'])
def get_all_users(request):
    users = User.objects.all()
    usernames = []
    for user in users:
        usernames.append(user.username)
    return Response(usernames, status=status.HTTP_200_OK)

@api_view(['GET'])
def get_all_friends(request):
    friends = Friend.objects.all()
    friends_list = []
    for friend in friends:
        username1 = User.objects.get(id=friend.oneId.pk).username
        username2 = User.objects.get(id=friend.twoId.pk).username
        friends_list.append([username1, username2])
    return Response(friends_list, status=status.HTTP_200_OK)


@api_view(['POST'])
def make_friend_request(request):
    data = request.data
    person1 = data['username1']
    person2 = data['username2']
    id1 = User.objects.get(username=person1).id
    id2 = User.objects.get(username=person2).id
    serializer = FriendRequestSerializer(data={'senderId': id1, 'receiverId': id2})
    if FriendRequest.objects.filter(senderId=id1,receiverId=id2).exists() or FriendRequest.objects.filter(senderId=id2,receiverId=id1).exists():
        return Response(None, status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)
