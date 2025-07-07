"""
URL configuration for core project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include
from core import views
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/usuarios/', include('users.urls')),
    path('api/songs/', include('songs.urls')),
    path('api/sentimientos/', include('sentiment.urls')),

    # Vistas HTML
    path('', views.login_view, name='login'),
    path('registro/', views.registro_view, name='registro'),
    path('buscar/', views.buscar_view, name='buscar'),
    path('ficha/', views.ficha_view, name='ficha'),
    path('historial/', views.historial_view, name='historial'),
    path('inicio/', views.inicio_view, name='inicio'),
    path('positivas/', views.positivas_view, name='positivas'),
    path('negativas/', views.negativas_view, name='negativas'),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATICFILES_DIRS[0])
