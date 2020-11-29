let chartColors = {
    // 'data1': '#007FFF',
    // 'data2': '#559955',
    // 'data3': '#ddaa33',
    // 'data4': '#9367B4'
    'data1': '#007FFF',
    'data2': '#9367B4'
    // 'data3': '#2dd8ff',
    // 'data1': '#1c3353',
    // 'data2': '#007FFF',
    // 'data3': '#c8d9f1',
    // 'data4': '#7ea5dd',
};

$(function() {
    $('#single-selection').multiselect({
        maxHeight: 300
    });

    initFormDates();
    renderWeights({
        columns: {
            data: [ // weights of indicators
                ['data1', 0.8, 0.8, 0.82, 0.82, 0.78, 0.76],
                ['data2', 0.88, 0.85, 0.80, 0.70, 0.60, 0.45],
                // ['data3', 0.1, 0.1, 0.2, 0.2, 0.35, 0.55],
            ],
            names:  ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь']
        },
        names: { // indicators
            'data1': 'Тяжелая промышленность',
            'data2': 'Численность населения'
        }
    });
    renderConsumption({
        columns: {
            data: [
                // ['data1', 15.0, 14.7, 15.9, 18.0, 15.0, 17.6, 16.9, 14.8, 16.6, 14.3],
                // ['data2', 16.9, 14.0, 15.0, 18.5, 15.0, 17.0, 16.6, 14.2, 16.6, 14.8]
                ['data1', 7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6],
                ['data2', 13.9, 14.2, 15.7, 18.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 16.6, 14.8]
            ],
            names: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт']
        },
        names: {
            'data1': 'Планируемое потребление',
            'data2': 'Фактическое потребление'
        }
    });
    renderChartSpline({
        columns: {
            data: [
                ['data1', 0.2, 0.8, 0.8, 0.8, 1, 1.3, 1.5, 2.9, 1.9, 2.6, 1.6, 3, 4, 3.6, 4.5, 4.2, 4.5, 4.5, 4, 3.1, 2.7, 4, 2.7, 2.3, 2.3, 4.1, 7.7, 7.1, 5.6, 6.1, 5.8, 8.6, 7.2, 9, 10.9, 11.5, 11.6, 11.1, 12, 12.3, 10.7, 9.4, 9.8, 9.6, 9.8, 9.5, 8.5, 7.4, 7.6],
                ['data2', 0, 0, 0.6, 0.9, 0.8, 0.2, 0, 0, 0, 0.1, 0.6, 0.7, 0.8, 0.6, 0.2, 0, 0.1, 0.3, 0.3, 0, 0.1, 0, 0, 0, 0.2, 0.1, 0, 0.3, 0, 0.1, 0.2, 0.1, 0.3, 0.3, 0, 3.1, 3.1, 2.5, 1.5, 1.9, 2.1, 1, 2.3, 1.9, 1.2, 0.7, 1.3, 0.4, 0.3]
            ],
            // names: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт']
        },
        names: {
            'data1': 'Планируемое потребление',
            'data2': 'Фактическое потребление'
        }
    });
});

function initFormDates() {
    $('form#dates').on('submit', function(e) {
        e.preventDefault();
        let baseUrl = 'http://lsd2020.igrogood.ru',
        // let baseUrl = 'http://lsd2020.igrogood.ru',
            formData = $(this).serialize();
        console.log(formData);

        // request url:
        // http://lsd2020.igrogood.ru:81/get_weight_of_indicators?startDate=2020.01.01&endDate=2020.2.31&region=altai
        // http://lsd2020.igrogood.ru/api/get_energy_consumption?startDate=2020.01.01&endDate=2020.02.29&region=altai
        $.ajax({
            url: baseUrl + '/api/get_weight_of_indicators.php',
            method: 'GET',
            data: formData,
            success: function(response) {
                console.log(response);
                // JSON.parse();
                // renderWeights(response);
            }
        });

        // request url:
        // http://lsd2020.igrogood.ru:81/get_energy_consumption?startDate=2020.01.01&endDate=2020.2.31&region=altai
        // http://lsd2020.igrogood.ru/api/get_energy_consumption?startDate=2020.01.01&endDate=2020.2.31&region=altai
        $.ajax({
            url: baseUrl + '/api/get_energy_consumption.php',
            method: 'GET',
            data: formData,
            success: function(response) {
                console.log(JSON.parse(response));
                
                let data1 = response.predict,
                data2 = response.fact;
                
                // setTimeout(function() { console.log(data1) }, 1000);
                console.log(data1);
                data1[0] = 'data1',
                data2[0] = 'data2';

                renderConsumption({
                    columns: {
                        data: [
                            data1,
                            data2
                            // response.predict,

                        ],
                        // names: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сент', 'Окт']
                    },
                    names: {
                        'data1': 'Планируемое потребление',
                        'data2': 'Фактическое потребление'
                    }
                });
                // renderConsumption(response);
            }
        });
    });
}

// график весов показателей колонками
function renderWeights(response) {
    c3.generate({
        bindto: '#chart-bar', // id of chart wrapper
        data: {
            columns: response.columns.data,
            type: 'bar', // default type of chart
            colors: chartColors,
            names: response.names
        },
        axis: {
            x: {
                type: 'category',
                // name of each category
                categories: response.columns.names
            }
        },
        bar: {
            width: 16
        },
        legend: {
            show: true, //hide legend
        },
        padding: {
            bottom: 20,
            top: 0
        },
    });
}

function renderConsumption(response) {    
    c3.generate({
        bindto: '#chart-temperature',
        data: {
            columns: response.columns.data,
            labels: true,
            type: 'line', // default type of chart
            colors: chartColors,
            names: response.names
        },
        axis: {
            x: {
                type: 'category',
                // name of each category
                categories: response.columns.names
            },
        },
        legend: {
            show: true, //hide legend
        },
        padding: {
            bottom: 20,
            top: 0
        }
    });
}

function renderChartSpline(response) {
    c3.generate({
        bindto: '#chart-spline',
        data: {
            columns: response.columns.data,
            labels: true,
            type: 'spline', // default type of chart
            colors: chartColors,
            names: response.names
        },
        legend: {
            show: true, //hide legend
        },
        padding: {
            bottom: 20,
            top: 0
        },
    });
}