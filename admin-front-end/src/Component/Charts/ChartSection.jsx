import '../../assets/css/MainSection.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
import MonthlyDetailsChart from './MonthlyDetailsChart'

const ChartSection = () => {
    const [TotalSelling, setTotalSelling] = useState([]);
    const [TotalProductSelling, setTotalProductSelling] = useState([]);
    const [months, setMonths] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7575/getMonthlySelling")
            .then((response) => {
                const monthlyData = (response.data);
                
                const newMonths = [];
                const newTotalSelling = [];
                const newTotalProductSelling = [];

                for (const month in monthlyData) {
                    if (Object.hasOwnProperty.call(monthlyData, month)) {
                        newMonths.push(month);
                        newTotalSelling.push(monthlyData[month].TotalSelling);
                        newTotalProductSelling.push(monthlyData[month].TotalProductSelling);
                    }
                }
                setMonths(newMonths);
                setTotalSelling(newTotalSelling);
                setTotalProductSelling(newTotalProductSelling);
            })
            .catch((error) => {
                console.error(error);
            });
    }, []);

    return (
        <main className="main-container" style={{maxHeight: 599, overflowY: 'auto'}}>
            <div className="charts">
                <div className="charts-card">
                    <p className="chart-title">Monthly Total Earning</p>
                    <MonthlyDetailsChart data={TotalSelling} months={months} lineColor={"#246dec"} bgColor={"rgba(36, 109, 236, 0.2)"} desc={"Total Sellings"} />
                </div>
                <div className="charts-card">
                    <p className="chart-title"> Monthly Total Product</p>
                    <MonthlyDetailsChart data={TotalProductSelling} months={months} lineColor={"#44ba10"} bgColor={"rgb(70, 232, 50, 0.2)"} desc={"Total Product Sellings"} />
                </div>
            </div>
        </main>
    )
}

export default ChartSection