from tensorflow import keras
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import Dense
from tensorflow.keras.utils import to_categorical
from matplotlib import pyplot as plt

y_train = to_categorical(y_train, 4)
y_test = to_categorical(y_test, 4)

model = Sequential()
model.add(Dense(500, activation='relu', input_dim=21))
model.add(Dense(100, activation='relu'))
model.add(Dense(50, activation='relu'))
model.add(Dense(4, activation='softmax'))

model.compile(optimizer='adam',
              loss='mse',
              metrics=['accuracy', 'mse', 'mae', 'mape'])

plt.ylabel('accuracy')
plt.plot(history.history['accuracy'])

plt.ylabel('MSE')
plt.plot(history.history['mse'])

y_pred = model.predict(X_test)
scores = model.evaluate(X_test, y_test, verbose=0)
print('Accuracy on test data: {} %'.format(scores[1] * 100))
