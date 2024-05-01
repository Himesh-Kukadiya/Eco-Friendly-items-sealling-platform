import { useEffect, useState } from "react";
import axios from "axios";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('UserData'))
    console.log(userData._id)
    axios.post('http://localhost:7575/getOrderHistory', { UId: userData._id })
      .then((response) => {
        console.log(response.data.allOrders)
        setOrders(response.data.allOrders)
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [])
  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map((od) => (
          <div key={od.OId + Date.now()} className="bg-white rounded shadow p-1" style={{boxShadow: "2px 2px 10px black"}}>
            <table width={"100%"} className="mt-3 rounded" style={{ border: "2px solid black" }}>
              <thead>
                <tr>
                  <th width={80} height={80}>
                    <center>
                      <img src={od.PImage} alt={od.PName} style={{ height: 60, width: 60, borderRadius: 100, boxShadow: "3px 3px 5px black" }} />
                    </center>
                  </th>
                  <th>
                    <h1> <strong> {od.PName} </strong></h1>
                  </th>
                </tr>
              </thead>
            </table>
            <table width={"100%"} className="rounded" style={{ border: "2px solid black", marginTop: -2 }}>
                <tbody>
                  <tr>
                    <th>OrderID</th>
                    <td>{od.OId}</td>
                  </tr>
                  <tr>
                    <th>ProductID</th>
                    <td>{od.PId}</td>
                  </tr>
                  <tr>
                    <th>SellerID</th>
                    <td>{od.SId}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td>{od.Price}</td>
                  </tr>
                  <tr>
                    <th>Quantity</th>
                    <td>{od.Quantity}</td>
                  </tr>
                  <tr>
                    <th>TotalAmount</th>
                    <td>{od.Total}</td>
                  </tr>
                  <tr>
                    <th>Date</th>
                    <td>{od.Date}</td>
                  </tr>
                </tbody>
              </table>
          </div>
        ))}

        {/* {orders.map(order => (
  <div key={order._id} className="bg-white rounded shadow p-4">
    <h2 className="text-lg font-semibold mb-2">Order #{order._id.toString()}</h2>
    <p className="text-gray-600 mb-1">Date: {order.date}</p> {/* This property is missing in your order objects */}
        {/* <p className="text-gray-600 mb-1">Total: ${order.TotalAmount}</p> */}
        {/* Add more details if needed */}

        {/* Iterating through the ProductList array */}
        {/* {order.ProductList.map((product, index) => ( */}
        {/* <div key={index} className="bg-gray-100 rounded p-2 mt-2">
        <p className="text-gray-800">Product: {product.name}</p>
        <p className="text-gray-800">Price: ${product.price}</p> */}
        {/* Add more details if needed */}
        {/* </div>
    ))} */}
      </div>
      {/* ))} */}

      {/* </div> */}
    </div>
  );
};

export default OrderHistory;
