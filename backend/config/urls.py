"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/6.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth.decorators import user_passes_test
from django.urls import path, include
from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
    SpectacularRedocView
)

superuser_required = user_passes_test(
    lambda u: u.is_authenticated and u.is_superuser,
    login_url='/admin/login/'
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('api.urls')),

    # Schema protegido
    path(
        'api/schema/',
        superuser_required(SpectacularAPIView.as_view()),
        name='schema'
    ),

    # Swagger protegido
    path(
        'api/docs/',
        superuser_required(
            SpectacularSwaggerView.as_view(url_name='schema')
        ),
        name='swagger-ui'
    ),

    # Redoc protegido
    path(
        'api/redoc/',
        superuser_required(
            SpectacularRedocView.as_view(url_name='schema')
        ),
        name='redoc'
    ),
]