import os
from ARIMA import ARIMA_model
from flask import request, Flask, abort, render_template, Response
from datetime import datetime
import json
from Database import app
from flask_cors import CORS

CORS(app, resources={"": {"origins": "*"}})
arima = ARIMA_model()


def convert_str_to_datetime(string: str):
    return datetime.strptime(string, '%Y.%m.%d')


@app.route('/')
def start_page():
    return 'The best server ever :)'


@app.route('/api/get_energy_consumption', methods=["GET"])
def send_subjects_info():
    request_params = request.args
    print(request_params)
    start_date = request_params['startDate']
    end_date = request_params['endDate']
    region = request_params['region']

    if not (region and start_date and end_date):
        return abort(400)

    start_date = convert_str_to_datetime(start_date)
    end_date = convert_str_to_datetime(end_date)

    predicted = arima.predict(start_date, end_date)
    print(predicted, type(predicted))

    _json = json.dumps(
        {'predict': predicted}
    )

    resp = Response("Foo bar baz")
    resp.headers['Access-Control-Allow-Origin'] = '*'
    resp.data = _json

    return resp


def init_server():
    app.secret_key = 'secret'
    app.config['SESSION_TYPE'] = 'filesystem'
    host = '0.0.0.0' if os.getenv('DATABASE_URL') else '127.0.0.1'
    app.run(host='127.0.0.1', port=81)


if __name__ == '__main__':
    init_server()
