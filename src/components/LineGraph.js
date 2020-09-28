import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

const options = {
    legend: {
        display: false,
    },
    elements: {
        point: {
            radius: 1
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
                    format: "YYYY-MM-DD",
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
    data.forEach(day => {
        const newDataPoint = {
            x: day.date,
            y: day[casesType]
        }
        chartData.push(newDataPoint);
    })    
    return chartData;
};

function LineGraph ({ casesType = "new_confirmed" }) {
    const [data, setData] = useState({});
// https://corona-api.com/timeline
    useEffect(() => {
        const fetchData = async () => {
            await fetch('https://corona-api.com/timeline')
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    let chartData = buildChartData(data.data, casesType);
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

export default LineGraph;
