from django.contrib import admin
from .models import Post
from .models import Filter
from .models import PostRequest
from .models import PostMember

class PostAdmin(admin.ModelAdmin):
    list_display = ('userId','gameName','date','time')

class FilterAdmin(admin.ModelAdmin):
    list_display = ('postId','filterName')

class PostRequestAdmin(admin.ModelAdmin):
    list_display = ('postId','senderId','accepted')

class PostMemberAdmin(admin.ModelAdmin):
    list_display = ('postId','userId')


admin.site.register(Post, PostAdmin)
admin.site.register(Filter, FilterAdmin)
admin.site.register(PostRequest, PostRequestAdmin)
admin.site.register(PostMember, PostMemberAdmin)
