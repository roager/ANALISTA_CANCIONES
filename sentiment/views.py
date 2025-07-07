from rest_framework import generics, permissions
from .models import AnalisisSentimiento
from .serializers import AnalisisSentimientoSerializer
from songs.models import BusquedaCancion
from rest_framework.response import Response
from rest_framework import status
from textblob import TextBlob  # o Vader

class AnalizarSentimientoView(generics.CreateAPIView):
    serializer_class = AnalisisSentimientoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        busqueda_id = request.data.get('busqueda_id')
        try:
            busqueda = BusquedaCancion.objects.get(id=busqueda_id, usuario=request.user)
        except BusquedaCancion.DoesNotExist:
            return Response({'error': 'Búsqueda no encontrada.'}, status=404)

        # Verificar si ya existe un análisis para esta búsqueda
        if AnalisisSentimiento.objects.filter(busqueda=busqueda).exists():
            return Response({'error': 'Esta búsqueda ya fue analizada.'}, status=400)

        texto = busqueda.letra
        blob = TextBlob(texto)
        polaridad = blob.sentiment.polarity

        etiqueta = 'positivo' if polaridad > 0.1 else 'negativo' if polaridad < -0.1 else 'neutro'

        analisis = AnalisisSentimiento.objects.create(
            busqueda=busqueda,
            puntaje_positivo=max(polaridad, 0),
            puntaje_negativo=max(-polaridad, 0),
            puntaje_neutro=1 - abs(polaridad),
            etiqueta=etiqueta
        )

        serializer = self.get_serializer(analisis)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
