from django.urls import path
from . import views
from django.views.generic import TemplateView


urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('create-session/',TemplateView.as_view(template_name='index.html')),
    path('look-by-date/',TemplateView.as_view(template_name='index.html')),
    path('look-by-time/',TemplateView.as_view(template_name='index.html')),
    path('api/create-post/',views.create_post,name="post"),
    #path('show-sessions/',TemplateView.as_view(template_name='index.html')),
    path('show-my-sessions/',TemplateView.as_view(template_name='index.html')),
    #path('api/show-my-posts/',views.get_my_posts,name="getmyposts")
    path('api/session-list/',views.get_all_sessions,name="session"),
    path('api/create-post-filter/',views.create_post_filter,name="post_filter"),
    path('api/post-filters/',views.get_post_filters, name="post_filters"),
    path('api/create-session-request/',views.create_session_request, name="session_request"),
    path('api/store-session-members/',views.store_session_members, name="session_members"),
    path('api/post-members-list/',views.get_post_members, name="post_members"),
]