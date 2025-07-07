from django.shortcuts import render

def login_view(request):
    return render(request, 'index.html')

def inicio_view(request):
    return render(request, 'inicio.html')

def registro_view(request):
    return render(request, 'registro.html')

def buscar_view(request):
    return render(request, 'buscar.html')

def historial_view(request):
    return render(request, 'historial.html')

def ficha_view(request):
    return render(request, 'ficha.html')

def positivas_view(request):
    return render(request, 'positivas.html')

def negativas_view(request):
    return render(request, 'negativas.html')
