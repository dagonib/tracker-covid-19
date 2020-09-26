import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 0
        },
    },
    maintainAspectRadio: false,
    tooltips: {
        mode: "index",
        interserct: false,
        callbacks: {
            label: function (tooltipItem, data) {
                return numeral(tooltipItem.value).format("+0,0");
            },
        },
    },
    scales: {
        xAxes: [
            {
                type: "time",
                time: {
                    format: "MM/DD/YYYY",
                    tooltipFormat: "ll",
                },
            },
        ],
        yAxes: [
            {
                gridLines: {
                    display: false,
                },
                ticks: {
                    callback: function (value, index, values) {
                        return numeral(value).format("0a");
                    },
                },
            },
        ],
    }
};   

const buildChartData = (data, casesType) => {
    const chartData = [];
    let lastDataPoint;
    for (let date in data[casesType]) {
        if (lastDataPoint) {
            const newDataPoint = {
                x: date,
                y: data[casesType][date] - lastDataPoint
            }
            chartData.push(newDataPoint);
        }
        lastDataPoint = data[casesType][date];
    };
    
    return chartData;
};

function LineGraph2 ({ casesType = "cases" }) {
    const [data, setData] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://corona-api.com/countries/ES')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data.data.latest_data);
                    console.log(data.data);
                    let chartData = buildChartData(data, casesType);
                    setData(chartData);
                })
        };   
        fetchData();
    }, [casesType]);

    return (
        <div className="w-100">
            {data?.length > 0 && (
                <Line 
                    options={options}
                    data={{
                        datasets: [
                            {
                                backgroundColor: "rgba(204, 16, 52, 0.5)",
                                borderColor: "CC1034",
                                data: data,
                            }
                        ]
                    }}
                />
            )}
        </div>
    )
}

export default LineGraph2;
