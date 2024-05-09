// import React from 'react'
import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import { Bar } from "react-chartjs-2";
import PropTypes from 'prop-types'

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);

const MonthlyOrders = (props) => {
    const chartData = {
        labels: props.months,
        datasets: [
            {
                label: "Sales",
                data: props.totals,
                backgroundColor: "darkgreen",
            },
        ]
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: "top"
            },
            title: {
                display: true,
                text: "Total Monthly Revanue"
            },
            scales: {
                x: {
                    type: "category",
                    grid: {
                        display: true
                    }
                },
                y: {
                    grid: {
                        display: true
                    },
                    ticks: {
                        beginAtZero: true
                    }
                }
            }
        }
    };
    return <Bar data={chartData} options={chartOptions} />;
}

MonthlyOrders.propTypes = {
    months: PropTypes.array,
    totals: PropTypes.array
}

export default MonthlyOrders