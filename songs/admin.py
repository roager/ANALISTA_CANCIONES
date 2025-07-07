from django.contrib import admin
from .models import BusquedaCancion

@admin.register(BusquedaCancion)
class BusquedaCancionAdmin(admin.ModelAdmin):
    list_display = ('titulo', 'usuario', 'fecha_busqueda')
    search_fields = ('titulo', 'letra')
    list_filter = ('fecha_busqueda',)
