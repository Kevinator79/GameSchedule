from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Feedback
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):
	class Meta:
		model = User
		fields = ('id','username','email','password')
		extra_kwargs = {"password":{'write_only': True}}

	def create(self,validated_data):
		return User.objects.create_user(validated_data['username'],validated_data['email'],validated_data['password'])



class FeedbackSerializer(serializers.ModelSerializer):
	class Meta:
		model = Feedback
		fields = ('email','firstname','surname','message')
           