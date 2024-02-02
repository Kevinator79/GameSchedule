from .serializers import PostSerializer
from .serializers import FilterSerializer
from .serializers import PostRequestSerializer
from .serializers import PostMemberSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Post
from .models import Filter
from .models import PostRequest
from .models import PostMember
from django.contrib.auth.models import User
import time


def isDateValid(date):
    if (len(date) != 10) or date[0] not in ['0','1','2','3'] or date[1] not in ['0','1','2','3','4','5','6','7','8','9']:
        return False
    if date[2] != '/' or date[3] not in ['0','1'] or date[4] not in ['0','1','2','3','4','5','6','7','8','9']:
        return False
    if date[5] != '/' or date[6] not in ['0','1','2','3','4','5','6','7','8','9'] or date[7] not in ['0','1','2','3','4','5','6','7','8','9']:
        return False
    if date[8] not in ['0','1','2','3','4','5','6','7','8','9'] or date[9] not in ['0','1','2','3','4','5','6','7','8','9']:
        return False
    try:
        time.strptime(date, '%d/%m/%Y')
        return True
    except:
        return False

def isTimeValid(time):
    valid = False
    if time in ['1am','2am','3am','4am','5am','6am','7am','8am','9am','10am','11am','12am']:
        valid = True
    elif time in ['1pm','2pm','3pm','4pm','5pm','6pm','7pm','8pm','9pm','10pm','11pm','12pm']:
        valid = True
    return valid
        

@api_view(['POST'])
def create_post(request):
    data = request.data
    date = data['date']
    time = data['time']
    game = data['game']
    serializer = PostSerializer(data={'gameName': game, 'date':date, 'time': time})
    if (date == '' or time == '' or game == ''):
        return Response('no-data', status=status.HTTP_403_FORBIDDEN)
    if isDateValid(date) is False:
        return Response('invalid-date', status=status.HTTP_400_BAD_REQUEST)
    if isTimeValid(time) is False:
        return Response('invalid-time', status=status.HTTP_400_BAD_REQUEST)
    if serializer.is_valid():
        serializer.save(userId = request.user)
        postId = Post.objects.latest('id').id
        return Response(postId, status=status.HTTP_200_OK)
    else:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def create_post_filter(request):
    data = request.data
    filterNames = data['filters']
    postId = data['postId']
    allValid = True
    for name in filterNames:
        serializer = FilterSerializer(data={'postId':postId, 'filterName':name})
        if serializer.is_valid():
            serializer.save()
        else:
            allValid = False
    
    if allValid:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def get_all_sessions(request):
    all_sessions = []
    posts = Post.objects.all()
    for post in posts:
        all_sessions.append([post.id,User.objects.get(username=post.userId).username, post.time, post.date, post.gameName])
    return Response(all_sessions)

@api_view(['GET'])
def get_post_filters(request):
    post_filters = Filter.objects.all()
    data = []
    for post_filter in post_filters:
        data.append([post_filter.postId.id, post_filter.filterName])
    return Response(data)


def doesTimeClash(requestsSent, compareTime):
    clashExists = False
    for postRequest in requestsSent:
        post = Post.objects.get(id=postRequest.postId.id)
        if (post.time == compareTime):
            clashExists = True
            break
    return clashExists

@api_view(['POST'])
def create_session_request(request):
    data = request.data
    postId = data['postId']
    userId = data['senderId']
    valid = False
    serializer = PostRequestSerializer(data={'postId':postId,'senderId':userId})
    if PostRequest.objects.filter(postId=postId,senderId=userId).exists():
        return Response('duplicate', status=status.HTTP_403_FORBIDDEN)
    if doesTimeClash(PostRequest.objects.filter(senderId=userId), Post.objects.get(id=postId).time):
        return Response('time-issue', status=status.HTTP_403_FORBIDDEN)
    if serializer.is_valid():
        valid = True
        serializer.save()
    
    if valid:
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def store_session_members(request):
    data = request.data
    postId = data['postId']
    print('Latest postId: ')
    print(postId)
    username = data['username']
    userId = User.objects.get(username=username).id
    serializer = PostMemberSerializer(data = {'postId':postId, 'userId':userId})
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    else:
        return Response(None, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_post_members(request):
    post_members = PostMember.objects.all()
    post_members_list = []
    for member_pair in post_members:
        post_members_list.append([member_pair.postId.id,User.objects.get(id=member_pair.userId.id).username])
    return Response(post_members_list, status=status.HTTP_200_OK)


#@api_view(['GET'])
#def get_my_posts(request):
#    data = request.data
#    userId = User.objects.get(username=data['username']).pk
#    serializer = GetPostSerializer(data={'userId':userId})
#    print("this function is working so far")
#    if serializer.is_valid():
#        posts = Post.objects.filter(userId=userId)
#        postsList = []
#        for post in posts:
#            postsList.append(post)
#        return Response(PostListSerializer(postsList).data, status=status.HTTP_200_OK)
#    else:
#        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
#