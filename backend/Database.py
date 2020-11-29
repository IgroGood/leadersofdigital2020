import logging

import datetime
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from DatabaseConfig import Config


logging.basicConfig(format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                    level=logging.INFO)

app = Flask(__name__)
app.config.from_object(Config)
db = SQLAlchemy(app)


class Predictions(db.Model):
    __tablename__ = 'predictions'
    id = db.Column(db.Integer, primary_key=True)

    date = db.Column(db.Date())
    prediction = db.Column(db.String(50))

    def __init__(self, date: datetime, prediction):
        self.date = date
        self.prediction = str(prediction)


if __name__ == '__main__':
    db.drop_all()
    db.create_all()
    db.session.commit()
