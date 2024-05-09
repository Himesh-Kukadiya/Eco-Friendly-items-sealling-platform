import { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from 'prop-types';

const BookingDetailsTable = (props) => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:7575/getOrders")
            .then(response => {
                const data = response.data;
                setData(data)
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    }, []);

    return (
        <>
            <div className="table-data">
                <div className="bookings">
                    <div className="head">
                        <h4 style={{ display: "inline-block" }}>Recent Orders</h4>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: props.maxHeight}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    <th className="bg-dark text-light">Product</th>
                                    <th className="bg-dark text-light">User</th>
                                    <th className="bg-dark text-light">Seller</th>
                                    <th className="bg-dark text-light">Category</th>
                                    <th className="bg-dark text-light">Status</th>
                                    <th className="bg-dark text-light">Price</th>
                                    <th className="bg-dark text-light">Quantity</th>
                                    <th className="bg-dark text-light">Total Amount</th>
                                    <th className="bg-dark text-light" width={100}>Order Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((order, index) => (
                                    <tr key={index}>
                                        <td><center>
                                            <img src={order.Image} alt="ProductImg" height={50} width={50} style={{boxShadow: "3px 3px 10px black", borderRadius: 100}} />
                                        </center></td>
                                        <td>{order.Product}</td>
                                        <td>{order.User}</td>
                                        <td>{order.Seller}</td>
                                        <td>{order.Category}</td>
                                        <td className={order.Status === "Confirmed" ? "text-danger" : "text-success"}>{order.Status}</td>
                                        <td>{order.Price}</td>
                                        <td>{order.Quantity}</td>
                                        <td>{order.TotalAmount}</td>
                                        <td>{order.Date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            </div>
        </>
    )
}

BookingDetailsTable.propTypes = {
    maxHeight: PropTypes.number
};
export default BookingDetailsTable