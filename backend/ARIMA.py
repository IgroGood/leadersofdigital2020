from pandas import Series
from sklearn.metrics import mean_squared_error
from statsmodels.tsa.arima_model import ARIMA
from math import sqrt
from Parser import get_train_used_energy
from datetime import datetime


class ARIMA_model:
    def predict(self, startDate: datetime, endDate: datetime):
        series = Series(get_train_used_energy(startDate))

        X = series.values
        X = X.astype('float32')

        predict_num = (endDate - startDate).days
        train, test = X[:-predict_num], X[-predict_num:]

        history = [x for x in train]
        predictions = list()

        for i in range(predict_num):
            model = ARIMA(history, order=(5, 1, 0))
            model_fit = model.fit(disp=0)
            y_hat = model_fit.forecast()[0]
            predictions.append(list(y_hat)[0])
            history.append(y_hat)
            print('%.0f> Predicted=%.3f' % (i, y_hat))

        return predictions
