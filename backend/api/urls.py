# pyrefly: ignore [missing-import]
from django.urls import path
from. import views

urlpatterns = [
    # auth
    path('user/signup', views.signup),
    path('user/check-email', views.check_email),
    path('user/google', views.create_user_google),
    path('user/auth', views.login),
    # ecg
    path('ecg/', views.ecg_view),
]    
