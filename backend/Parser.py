import requests
import json
from datetime import datetime, timedelta

url = 'https://br.so-ups.ru/webapi/api/CommonInfo/GenConsum'


def format_date_4_request(date: datetime):
    return date.strftime('%Y.%m.%d')


possible_request_params = {
    'priceZone[]': (1, 2),
    'oesTerritory[]': (530000, 550000, 600000, 610000, 630000, 840000),
    'startDate': '2020.11.26',
    'endDate': '2020.11.27'
}

power_systems_by_id = {
    53000: 'ОЭС Центра',
    550000: 'ОЭС Юга',
    600000: 'ОЭС Средней Волги',
    610000: 'ОЭС Сибири',
    630000: 'ОЭС Урала',
    840000: 'ОЭС Северо-Запада',
}

# request example for ОЭС Урала, 1 price zone, between yesterday and today
# request = requests.get(
#     url,
#     params={
#         'priceZone[]': 1,
#         'oesTerritory[]': 630000,
#         'startDate': format_date_4_request(datetime.now() - timedelta(days=1)),
#         'endDate': format_date_4_request(datetime.now())
#     },
#     verify=False
# )
#
# json_data = json.loads(request.text)
# print(json_data)


def get_train_used_energy(date: datetime):
    years = 3
    dates = []
    used_energy = []
    request = requests.get(
        url,
        params={
            'priceZone[]': 1,
            'oesTerritory[]': 630000,
            'startDate': date - timedelta(weeks=4 * 12 * years),
            'endDate': date
        },
        verify=False
    )
    json_data = json.loads(request.text)

    for item in json_data[0]['m_Item2']:
        if item['M_DATE'] and item['E_USE_FACT']:
            dt = datetime.strptime(item['M_DATE'], '%Y-%m-%dT00:00:00+03:00')

            dates.append(dt)
            used_energy.append(item['E_USE_FACT'])

    return used_energy
