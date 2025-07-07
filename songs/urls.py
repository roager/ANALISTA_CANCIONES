from django.urls import path
from .views import (
    CrearBusquedaView,
    HistorialBusquedaView,
    BuscarYGuardarLetraView,
    DetalleBusquedaView
)

urlpatterns = [
    path('crear/', CrearBusquedaView.as_view(), name='crear_busqueda'),
    path('historial/', HistorialBusquedaView.as_view(), name='historial_busqueda'),
    path('buscar-letra/', BuscarYGuardarLetraView.as_view(), name='buscar_letra'),
    path('detalle/<int:pk>/', DetalleBusquedaView.as_view(), name='detalle_busqueda'),
]
