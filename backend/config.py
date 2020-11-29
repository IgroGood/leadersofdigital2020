import os

PORT = int(os.environ.get("PORT", 81))

DB_NAME = os.getenv('DB_NAME', 'main')
DB_USER = os.getenv('DB_USER', 'admin')
DB_PASSWORD = os.getenv('DB_PASSWORD', 'admin')
DATABASE_URL = os.getenv('DATABASE_URL', )
