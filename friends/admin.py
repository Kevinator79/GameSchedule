from django.contrib import admin
from .models import Friend
from .models import FriendRequest

class FriendAdmin(admin.ModelAdmin):
    list_display = ('oneId','twoId')

class FriendRequestAdmin(admin.ModelAdmin):
    list_display = ('senderId','receiverId', 'accepted')


admin.site.register(Friend, FriendAdmin)
admin.site.register(FriendRequest, FriendRequestAdmin)