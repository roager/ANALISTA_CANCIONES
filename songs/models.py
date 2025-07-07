from django.db import models
from users.models import Usuario

class BusquedaCancion(models.Model):
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name='busquedas')
    artista = models.CharField(max_length=255, blank=True)  # ✅ Campo nuevo para evitar el error
    titulo = models.CharField(max_length=255)
    letra = models.TextField()
    fecha_busqueda = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'búsqueda de canción'
        verbose_name_plural = 'búsquedas de canciones'

    def __str__(self):
        return f"{self.titulo} - {self.usuario.username}"
