import psycopg2

try:
    conn = psycopg2.connect(
        dbname="music_analyzer",
        user="music_admin",
        password="Musica2025%",
        host="localhost",
        port="5432"
    )
    print("✅ Conexión exitosa.")
    conn.close()
except Exception as e:
    print("❌ Error:")
    print(e)
