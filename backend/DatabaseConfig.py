import os

from config import DB_NAME, DB_PASSWORD, DB_USER

basedir = os.path.abspath(os.path.dirname(__file__))


class Config(object):
    DEBUG = False
    TESTING = False
    CSRF_ENABLED = True
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or \
                              f'sqlite:///{DB_NAME}.db'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
