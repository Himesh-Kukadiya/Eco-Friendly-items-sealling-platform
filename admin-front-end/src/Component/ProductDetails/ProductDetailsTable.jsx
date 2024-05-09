import { useEffect, useState } from "react";
import axios from "axios";

const BoxDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:7575/getProductDetails")
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
                        <h4 style={{ display: "inline-block" }}>Products Details</h4>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 460,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    <th className="bg-dark text-light">Image</th>
                                    <th className="bg-dark text-light">Name</th>
                                    <th className="bg-dark text-light">Seller</th>
                                    <th className="bg-dark text-light">Category</th>
                                    <th className="bg-dark text-light">Brand</th>
                                    <th className="bg-dark text-light">Price</th>
                                    <th className="bg-dark text-light">Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((product, index) => (
                                    <tr key={index}>
                                        <td>{index +1}</td>
                                        <td>
                                            <center>
                                                <img src={product.banner} alt="Prductimg" height={50} width={50} style={{boxShadow: "3px 3px 10px black", borderRadius: 100}} />
                                            </center>
                                        </td>
                                        <td>{product.title}</td>
                                        <td>{product.seller}</td>
                                        <td>{product.category}</td>
                                        <td>{product.brand}</td>
                                        <td>{product.price}</td>
                                        <td>{product.quantity}</td>
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

export default BoxDetailTable