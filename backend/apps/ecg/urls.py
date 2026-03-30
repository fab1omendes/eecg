from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ECGViewSet

router = DefaultRouter()
router.register(r'ecg', ECGViewSet)

urlpatterns = [
    path('', include(router.urls)),
]