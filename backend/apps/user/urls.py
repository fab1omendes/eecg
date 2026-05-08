from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import UserViewSet

router = DefaultRouter()
router.register(r'user', UserViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('check-email', UserViewSet.as_view({'get': 'check_email'})),
    path('signup', UserViewSet.as_view({'post': 'signup'})),
    path('auth', UserViewSet.as_view({'post': 'auth'})),
]   