from django.urls import path
from . import views
from django.views.generic import TemplateView

urlpatterns = [
    path('',TemplateView.as_view(template_name='index.html')),
    path('sign-in/',TemplateView.as_view(template_name='index.html')),
    path('create-account/',TemplateView.as_view(template_name='index.html')),
    path('contact-us/',TemplateView.as_view(template_name='index.html')),
    path('home/',TemplateView.as_view(template_name='index.html')),
    path('privacy-policy/',TemplateView.as_view(template_name='index.html')),
    path('api/login/', views.login, name="login"),
    path('api/signup/',views.sign_up,name="signup"), 
    path('api/send-contact-message/',views.store_contact_message,name="contact-message"),
    path('settings/',TemplateView.as_view(template_name='index.html')),
    path('api/update-email/', views.update_email, name="update-email"),
    path('api/update-password/', views.update_password, name="update-password"),
]