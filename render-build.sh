#!/usr/bin/env bash

echo "📦 Instalando dependencias..."
pip install -r requirements.txt

echo "⏳ Aplicando migraciones de base de datos..."
python manage.py migrate --noinput
echo "✅ Migraciones aplicadas"

# (Opcional) Crear superusuario automáticamente si no existe
echo "👤 Verificando superusuario..."
python manage.py shell << END
from django.contrib.auth import get_user_model
User = get_user_model()
if not User.objects.filter(username='admin').exists():
    User.objects.create_superuser('admin', 'admin@example.com', 'admin123')
    print("✅ Superusuario creado: admin / admin123")
else:
    print("🟢 El superusuario ya existe")
END

echo "🎉 Build finalizado correctamente"
