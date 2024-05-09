import { useEffect, useState } from 'react'
import '../../assets/css/MainSection.css'
import axios from 'axios'
import CountUp from 'react-countup';
import BookingDetailsTable from '../OrdersDetail/OrderDetailsTable'

const MainSection = () => {
    const [counter, setCounter] = useState({"User": 0, "BoxKeeper": 0, "Boxes": 0, "Booking":0})
    
    useEffect(() => {
        axios.get("http://localhost:7575/getCounter")
            .then(response => {
                const totals = response.data.counter;
                setCounter(totals)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);
    
    return (
        <main className="main-container">
            <div className="main-title">
                <p className="font-weight-bold" style={{display: 'inline-block'}}>DASHBOARD</p>
            </div>

            <div className="main-cards">
                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL&ensp;USERS</p>
                        <span className="material-icons-outlined text-blue">people_outline</span>
                    </div>
                    <span className="text-primary font-weight-bold"><CountUp start={0} end={counter.totalUser} duration={2} separator="," suffix="" className="text-green-600 font-bold text-4xl" /></span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL SELLERS</p>
                        <span className="material-icons-outlined text-orange">account_circle</span>
                    </div>
                    <span className="text-primary font-weight-bold"><CountUp start={0} end={counter.totalSeller} duration={2} separator="," suffix="" className="text-green-600 font-bold text-4xl" /></span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL PRODUCTS</p>
                        <span className="material-icons-outlined text-green">inventory</span>
                    </div>
                    <span className="text-primary font-weight-bold"><CountUp start={0} end={counter.totalProduct} duration={2} separator="," suffix="" className="text-green-600 font-bold text-4xl" /></span>
                </div>

                <div className="card">
                    <div className="card-inner">
                        <p className="text-primary">TOTAL ORDERS</p>
                        <span className="material-icons-outlined text-red">event_note</span>
                    </div>
                    <span className="text-primary font-weight-bold"><CountUp start={0} end={counter.totalOrder} duration={2} separator="," suffix="" className="text-green-600 font-bold text-4xl" /></span>
                </div>
            </div>

			<BookingDetailsTable maxHeight={300} />
        </main>
    )
}

export default MainSection


