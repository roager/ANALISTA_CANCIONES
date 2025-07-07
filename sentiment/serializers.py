from rest_framework import serializers
from .models import AnalisisSentimiento

class AnalisisSentimientoSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnalisisSentimiento
        fields = ['id', 'puntaje_positivo', 'puntaje_neutro', 'puntaje_negativo', 'etiqueta', 'fecha_analisis']
        read_only_fields = ['fecha_analisis']