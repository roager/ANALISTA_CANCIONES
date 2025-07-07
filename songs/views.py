import requests
from rest_framework.views import APIView
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .models import BusquedaCancion
from .serializers import BusquedaCancionSerializer
# from sentiment.models import AnalisisSentimiento
# from sentiment.serializers import AnalisisSentimientoSerializer
# from textblob import TextBlob


class CrearBusquedaView(generics.CreateAPIView):
    serializer_class = BusquedaCancionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)


class HistorialBusquedaView(generics.ListAPIView):
    serializer_class = BusquedaCancionSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BusquedaCancion.objects.filter(usuario=self.request.user).order_by('-fecha_busqueda')


class BuscarYGuardarLetraView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        artista = request.data.get('artista')
        titulo = request.data.get('titulo')

        if not artista or not titulo:
            return Response({'error': 'Faltan datos: artista y título son requeridos.'}, status=400)

        url = f"https://api.lyrics.ovh/v1/{artista}/{titulo}"
        respuesta = requests.get(url)

        if respuesta.status_code != 200:
            return Response({'error': 'Letra no encontrada.'}, status=404)

        letra = respuesta.json().get('lyrics', '')

        busqueda = BusquedaCancion.objects.create(
            usuario=request.user,
            artista=artista,
            titulo=titulo,
            letra=letra
        )

        busqueda_data = BusquedaCancionSerializer(busqueda).data

        return Response({
            'busqueda': busqueda_data
        }, status=status.HTTP_201_CREATED)


class DetalleBusquedaView(generics.RetrieveAPIView):
    queryset = BusquedaCancion.objects.all()
    serializer_class = BusquedaCancionSerializer
    permission_classes = [permissions.IsAuthenticated]
