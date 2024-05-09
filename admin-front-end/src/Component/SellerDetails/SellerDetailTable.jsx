import { useEffect, useState } from "react";
import axios from "axios";

const BoxKeeperDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:7575/getSellers")
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
                        <h4 style={{ display: "inline-block" }}>Seller Details</h4>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 500,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    {/* <th className="bg-dark text-light">Box Keeper ID</th> */}
                                    <th className="bg-dark text-light">Seller Name</th>
                                    <th className="bg-dark text-light">Seller Email</th>
                                    <th className="bg-dark text-light">Seller Mobile</th>
                                    <th className="bg-dark text-light">Seller Aadhar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((seller, index) => (
                                    <tr key={seller._id}>
                                        <td>{index + 1}</td>
                                        {/* <td>{user._id}</td> */}
                                        <td>{seller.sellername}</td>
                                        <td>{seller.selleremail}</td>
                                        <td>{seller.mobile}</td>
                                        <td>{seller.adharno}</td>
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

export default BoxKeeperDetailTable