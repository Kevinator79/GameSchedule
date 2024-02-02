from django.contrib import admin
from .models import Feedback

class FeedbackAdmin(admin.ModelAdmin):
    list_display = ('email','firstname','surname','message')

admin.site.register(Feedback, FeedbackAdmin)
