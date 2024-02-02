from django.http import HttpResponse
from .serializers import UserSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from rest_framework import status
from .serializers import FeedbackSerializer

@api_view(['POST'])
def sign_up(request):
    data = request.data
    email = data['email']
    username = data['username']
    password = data['password']
    if (email == '' or username == '' or password == ''):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)
    if (User.objects.filter(email=email).exists()):
        return Response('email-exists', status.HTTP_400_BAD_REQUEST)
    if (User.objects.filter(username=username).exists()):
        return Response('username-exists', status.HTTP_400_BAD_REQUEST)
    serializer = UserSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status.HTTP_200_OK)
    return Response((), status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def login(request):
    data = request.data
    username = data['username']
    password = data['password']
    try:
        user = User.objects.get(username=username)
        email = user.email
        serializer = UserSerializer(instance = user, data = {'username':username,'email':email,'password':password})

        if serializer.is_valid():
            user = authenticate(request, username=username, password=password)
            if user is not None:
                return Response(serializer.data, status= status.HTTP_200_OK)

    except:
        return Response((), status = status.HTTP_404_NOT_FOUND)                   

    return Response(serializer.data, status = status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_email(request):
    data = request.data
    username = data['username']
    email = data['email']
    try:
        user = User.objects.get(username=username)
        if (email == ''):
            return Response('empty-field', status.HTTP_400_BAD_REQUEST)
        if (User.objects.filter(email=email).exists()):
            return Response('email-exists', status.HTTP_400_BAD_REQUEST)
        oldEmail = user.email
        password = user.password
        serializer = UserSerializer(instance = user, data = {'username':username,'email':oldEmail,'password':password})
        if serializer.is_valid():
            user.email = email
            user.save(update_fields=['email'])
            #serializer.update({'username':username,'email':email,'password':password})
            return Response(serializer.data, status.HTTP_200_OK)
        return Response((), status=status.HTTP_400_BAD_REQUEST)

    except:
        return Response((), status = status.HTTP_404_NOT_FOUND)

@api_view(['POST'])
def update_password(request):
    data = request.data
    username = data['username']
    password = data['password']
    newPassword = data['newPassword']

    if (password == ''):
        return Response('empty-field', status.HTTP_400_BAD_REQUEST)

    user = User.objects.get(username=username)
    email = user.email

    serializer = UserSerializer(instance = user, data = {'username':username,'email':email,'password':password})

    if serializer.is_valid():
        user = authenticate(request, username=username, password=password)
        if user is not None:
            user.set_password(newPassword)
            #user.save(update_fields=['password'])
            user.save()
            return Response(serializer.data, status= status.HTTP_200_OK)

    return Response(serializer.data, status = status.HTTP_404_NOT_FOUND)    

@api_view(['POST'])
def store_contact_message(request):
    data = request.data
    serializer = FeedbackSerializer(data=data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)