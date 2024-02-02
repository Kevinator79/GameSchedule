from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Post
from .models import Filter
from .models import PostRequest
from .models import PostMember

class PostSerializer(serializers.ModelSerializer):
	class Meta:
		model = Post
		fields = ('gameName','date','time')

class FilterSerializer(serializers.ModelSerializer):
	class Meta:
		model = Filter
		fields = ('postId','filterName')

class PostRequestSerializer(serializers.ModelSerializer):
	class Meta:
		model = PostRequest
		fields = ('postId', 'senderId')

class PostMemberSerializer(serializers.ModelSerializer):
	class Meta:
		model = PostMember
		fields = ('postId', 'userId')