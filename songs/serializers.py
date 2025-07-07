from rest_framework import serializers
from .models import BusquedaCancion
from sentiment.serializers import AnalisisSentimientoSerializer

class BusquedaCancionSerializer(serializers.ModelSerializer):
    analisis = AnalisisSentimientoSerializer(read_only=True)

    class Meta:
        model = BusquedaCancion
        fields = ['id', 'titulo', 'artista', 'letra', 'fecha_busqueda', 'analisis']
