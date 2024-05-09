import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const sellerData = JSON.parse(localStorage.getItem('SellerData'));

const OrderManagement = () => {
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filterName, setFilterName] = useState("");

  useEffect(() => {
    if (!sellerData) {
      navigate('/');
    } else {
      const sellerId = sellerData._id;
      axios.post("http://localhost:7575/getOrders", { sellerId })
        .then((response) => {
          setOrders(response.data.sellerOrders);
        })
        .catch((error) => {
          console.log(error.response.data);
        });
    }
  }, []);

  const handleStatus = (orderId, status, PId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: status } : order
    ));

    axios.post("http://localhost:7575/updateStatus", { orderId, status: status, PId })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
    axios.post("http://localhost:7575/cancelOrder", { orderId })
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  };

  const filterBy = (name) => {
    setFilterName(name);
    
  };

  // Filter orders based on filterName
  const filteredOrders = orders.filter(order => {
    if (filterName === "Today") {
      const today = new Date().toISOString().slice(0, 10);
      return order.date === today;
    } else if (filterName === "Week") {
      const currentDate = new Date();
      const firstDayOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay()));
      const lastDayOfWeek = new Date(currentDate.setDate(firstDayOfWeek.getDate() + 6));
      const startDate = firstDayOfWeek.toISOString().slice(0, 10);
      const endDate = lastDayOfWeek.toISOString().slice(0, 10);
      return order.date >= startDate && order.date <= endDate;
    } else if (filterName === "Month") {
      const currentDate = new Date();
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
      const startDate = firstDayOfMonth.toISOString().slice(0, 10);
      const endDate = lastDayOfMonth.toISOString().slice(0, 10);
      return order.date >= startDate && order.date <= endDate;
    } else if (filterName === "Year") {
      const currentDate = new Date();
      const startDate = new Date(currentDate.getFullYear(), 0, 1);
      const endDate = new Date(currentDate.getFullYear(), 11, 31);
      const startYear = startDate.toISOString().slice(0, 10);
      const endYear = endDate.toISOString().slice(0, 10);
      return order.date >= startYear && order.date <= endYear;
    } else {
      return true; // No filter applied
    }
  });
  

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>
      <div className="mx-auto grid grid-cols-1 md:grid-cols-5 gap-4 mb-5">
        <button className="flex-grow py-2 bg-gray-500 text-white hover:bg-gray-600" onClick={() => filterBy("default")}>Default</button>
        <button className="flex-grow py-2 bg-gray-500 text-white hover:bg-gray-600" onClick={() => filterBy("Today")}>Today</button>
        <button className="flex-grow py-2 bg-gray-500 text-white hover:bg-gray-600" onClick={() => filterBy("Week")}>This Week</button>
        <button className="flex-grow py-2 bg-gray-500 text-white hover:bg-gray-600" onClick={() => filterBy("Month")}>This Month</button>
        <button className="flex-grow py-2 bg-gray-500 text-white hover:bg-gray-600" onClick={() => filterBy("Year")}>This Year</button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto border-collapse">
          <thead>
            <tr>
              <th className="border p-2">Product</th>
              {/* <th className="border p-2">Product ID</th> */}
              <th className="border p-2" style={{ width: 100 }}>Date</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Customer Mobile</th>
              <th className="border p-2">Address</th>
              <th className="border p-2">Zip Code</th>
              <th className="border p-2">Product Name</th>
              <th className="border p-2">Quantity</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map(order => (
              <tr key={order.id}>
                <td className="border p-2" style={{ width: 90 }}>
                  <center><img src={order.banner} alt={order.PName} style={{ height: 70, width: 70, borderRadius: 100, boxShadow: "3px 3px 10px black" }} /></center>
                </td>
                {/* <td className="border p-2">{order.id}</td> */}
                <td className="border p-2">{order.date}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">{order.customerMobile}</td>
                <td className="border p-2">{order.address}</td>
                <td className="border p-2">{order.zipCode}</td>
                <td className="border p-2">{order.PName}</td>
                <td className="border p-2"><center>{order.quantity}</center></td>
                <td className="border p-2" style={{ width: 80 }}><center>₹ {order.price}</center></td>
                <td className="border p-2">₹ {order.totalAmount}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2" style={{ width: 160 }}>
                  <center>
                    {order.status === 'Pending' ? (
                      <button onClick={() => handleStatus(order.id, "Confirmed", order.PId)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"><i className="material-icons">done</i></button>
                    ) : (
                      <button onClick={() => handleStatus(order.id, "Pending", order.PId)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-3"> <i className="material-icons">watch_later</i> </button>
                    )}
                    <button onClick={() => handleCancelOrder(order.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"><i className="material-icons">close</i></button>
                  </center>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
