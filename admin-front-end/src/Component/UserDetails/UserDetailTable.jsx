import { useEffect, useState } from "react";
import axios from "axios";

const UserDetailTable = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        axios.get("http://localhost:7575/getUserDerail")
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
                        <h4 style={{ display: "inline-block" }}>User Details</h4>
                        <i className='bx bx-search' ></i>
                        <i className='bx bx-filter' ></i>
                    </div>
                    <div className="tbl" style={{maxHeight: 460,}}>
                        <table className="table table-bordered text-center table-striped">
                            <thead>
                                <tr>
                                    <th className="bg-dark text-light">#</th>
                                    <th className="bg-dark text-light">User ID</th>
                                    <th className="bg-dark text-light">User Name</th>
                                    <th className="bg-dark text-light">User Email</th>
                                    <th className="bg-dark text-light">Password</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((user) => (
                                    <tr key={user._id}>
                                        {/* <td>{index + 1}</td> */}
                                        <td><center>
                                            <img src={`http://localhost:7575/Images/Products/${user.UImage}`} alt={`${user.UImage}`} height={50} width={50} style={{boxShadow: "3px 3px 10px black", borderRadius: 100}} />
                                        </center></td>
                                        <td >{user._id}</td>
                                        <td>{user.UName}</td>
                                        <td>{user.UEmail}</td>
                                        <td>{user.UPassword}</td>
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

export default UserDetailTable