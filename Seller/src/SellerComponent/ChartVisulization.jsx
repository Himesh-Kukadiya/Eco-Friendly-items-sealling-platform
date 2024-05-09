import { useState, useEffect} from "react"
import CategorySelling from "./Charts/CategorySelling"
import MonthlyOrders from "./Charts/MonthlyOrders"
import axios from "axios";
import {useNavigate} from "react-router-dom";
import ComparativeLineGraph from "./Charts/ComparativeLineGraph";

const sellerData = JSON.parse(localStorage.getItem("SellerData"));
const ChartVisulization = () => {
    const [months, setMonths] = useState([]);
    const navigate = useNavigate();
    const [monthlyData, setMonthlyData] = useState([]);
    const [totals, setTotals] = useState([]);
    const [renderComponent, setRenderComponent] = useState(false);

    useEffect(() => {
        if(!sellerData) {
            navigate("/")
        }

        axios.post("http://127.0.0.1:7575/monthlyBarGraph", {sellerId: sellerData._id})
        .then((response) => {
            setMonthlyData(response.data.data)
        }) 
        .catch((error) => {
            console.log(error.response.data.message)
        });
        
        const timer = setTimeout(() => {
            setRenderComponent(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        const month = [];
        const total = [];
        monthlyData.map((m) => {
            month.push(m.month);
            total.push(m.total);
        });
        setMonths(month);
        setTotals(total);
    }, [monthlyData]);
    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-10" >
                <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-100" >
                    <CategorySelling />
                </div>
                <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-100" >
                    <MonthlyOrders months={months} totals={totals} />
                </div>
            </div>
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mt-10 mb-10" >
                <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-100" >
                    { 
                        renderComponent ? (
                            <ComparativeLineGraph months={months} sellerId={sellerData._id} />
                        ) : null
                    }
                </div>
                <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-100" >
                </div>
            </div>
        </>
    )
}
export default ChartVisulization

