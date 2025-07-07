from django.urls import path
from .views import AnalizarSentimientoView

urlpatterns = [
    path('analizar/', AnalizarSentimientoView.as_view(), name='analizar_sentimiento'),
]