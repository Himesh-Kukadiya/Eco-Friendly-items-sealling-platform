import {Chart as ChartJS,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend} from "chart.js";
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import {useNavigate} from "react-router-dom";

ChartJS.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
const sellerData = JSON.parse(localStorage.getItem("SellerData"));

const CategorySelling = () => {
    const navigate = useNavigate();
    const [revanue, setRevanue] = useState([]);
    const [category, setCategory] = useState([]);

    useEffect(() => {
        if(!sellerData) {
            navigate("/")
        }

        axios.post("http://127.0.0.1:7575/categoriesBarGraph", {sellerId: sellerData._id})
        .then((response) => {
            setCategory(response.data.category)
            setRevanue(response.data.revenue)
        }) 
        .catch((error) => {
            console.log(error.response.data.message)
        });
    }, []);

    const chartData = {
        labels: category,
        datasets: [
            {
                label: "Sales",
                data: revanue,
                backgroundColor: "gray",  
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
                text: "Total Category wise Revanue"
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

export default CategorySelling
