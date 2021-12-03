Highcharts.chart('containerBar', {
    chart: {
        type: 'bar',
        backgroundColor: 'transparent'
    },
    title: {
        text: 'DATA NOM'
    },
    subtitle: {
        text: 'Source: <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">Wikipedia.org</a>'
    },
    xAxis: {
        categories: ['victimes', 'sauveteurs'],
        title: {
            text: null
        }
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Nombre de personnes',
            align: 'high'
        },
        labels: {
            overflow: 'justify'
        }
    },
    tooltip: {
        valueSuffix: ' millions'
    },
    plotOptions: {
        bar: {
            dataLabels: {
                enabled: true
            }
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
        x: -40,
        y: 80,
        floating: true,
        borderWidth: 1,
        backgroundColor: Highcharts.defaultOptions.legend.backgroundColor || '#FFFFFF',
        shadow: true
    },
    credits: {
        enabled: false
    },
    series: [{
        data: [107, 31]
    }]
});