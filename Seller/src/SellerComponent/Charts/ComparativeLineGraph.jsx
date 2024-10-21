import {  useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from "axios";
import PropTypes from 'prop-types'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);
const ComparativeLineGraph = (props) => {
    const [MonthlyOrders, setMonthlyOrders] = useState([]);
    useEffect(() => {
        axios.post("http://localhost:7575/CategoryComparison", {sellerId: props.sellerId})
        .then((Response)=> {
            setMonthlyOrders(Response.data)
        })
        .catch((e)=> {
            console.error(e)
        })
    }, []);
    const data = {
        labels: props.months,
        datasets: MonthlyOrders,
    };
    const options = {
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: "All Categories Sellings"
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: "Total Selling Amounnt",
                },
            },
        },
    };

    return (
        <>
            <Line options={options} data={data} />
        </>
    );
}

ComparativeLineGraph.propTypes = {
    months: PropTypes.array,
    sellerId: PropTypes.string,
}

export default ComparativeLineGraph