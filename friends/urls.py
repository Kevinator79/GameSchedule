from django.urls import path
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('api/user-list/',views.get_all_users,name="users"),
    path('api/friend-list/',views.get_all_friends, name="friends"),
    path('api/make-friend-request/',views.make_friend_request, name="friend_request"),
]