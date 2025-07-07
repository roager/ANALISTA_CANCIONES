from django.contrib import admin
from .models import AnalisisSentimiento

@admin.register(AnalisisSentimiento)
class AnalisisSentimientoAdmin(admin.ModelAdmin):
    list_display = ('busqueda', 'etiqueta', 'fecha_analisis')
    list_filter = ('etiqueta', 'fecha_analisis')
