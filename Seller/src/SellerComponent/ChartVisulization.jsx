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
                {/* <div className="bg-gray-200 p-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-100" >
                </div> */}
            </div>
        </>
    )
}
export default ChartVisulization

// EcoS: Eco-Friendly Item Selling Platform
// EcoS is a MERN stack project aimed at promoting eco-friendly products through an intuitive online platform. As the team leader and backend developer, I spearheaded the creation of a three-sided system catering to users, sellers, and administrators.
// Features:
// User Module: Enables users to login with OTP verification, change password, view products, filter by category, see product details, search, add to cart, place orders, update profiles, and access order history.
// Seller Module: Sellers can apply for selling, add new products, update products, view product details, user details, order details, and utilize graphs for business insights.
// Admin Module: Administrators oversee and manage users, sellers, and orders. They also have access to graphs depicting sales data.

// Acknowledgments:
// Faculty: Parvez Belim, for guidance and support throughout the project-based learning journey.
// Team Members: Gratitude to Bimal Bera and Priyank Vadodariya, frontend developers, for their invaluable contributions and unwavering support.
// aa check kari lejene