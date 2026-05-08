from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'ecg', views.ECGViewSet)
router.register(r'cardioflux-history', views.CardioFluxViewSet, basename='cardioflux-history')

urlpatterns = [
    path('', include(router.urls)),
]