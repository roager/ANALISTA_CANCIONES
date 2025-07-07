from django.db import models
from songs.models import BusquedaCancion

class AnalisisSentimiento(models.Model):
    busqueda = models.OneToOneField(BusquedaCancion, on_delete=models.CASCADE, related_name='analisis')
    puntaje_positivo = models.FloatField()
    puntaje_neutro = models.FloatField()
    puntaje_negativo = models.FloatField()
    etiqueta = models.CharField(max_length=50)  # 'positivo', 'negativo', 'neutro'
    fecha_analisis = models.DateTimeField(auto_now_add=True)
    class Meta:
        verbose_name = 'análisis de sentimiento'
        verbose_name_plural = 'análisis de sentimientos'
    def __str__(self):
        return f"{self.busqueda.titulo} → {self.etiqueta}"