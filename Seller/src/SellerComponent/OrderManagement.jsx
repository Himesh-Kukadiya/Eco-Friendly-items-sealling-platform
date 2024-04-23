import React, { useState } from 'react';

const OrderManagement = () => {
  const [orders, setOrders] = useState([
    { id: 1, customerName: 'Bimal Bera', totalAmount: '$50', status: 'Pending' },
    { id: 2, customerName: 'Himesh', totalAmount: '$100', status: 'Pending' },
    { id: 3, customerName: 'Priyank', totalAmount: '$75', status: 'Pending' }
  ]);

  const handleStatusChange = (orderId) => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: order.status === 'Pending' ? 'Confirmed' : 'Pending' } : order
    ));
  };

  const handleCancelOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">Order Management</h1>
      <div className="overflow-x-auto">
        <table className="table-auto border-collapse w-full">
          <thead>
            <tr>
              <th className="border p-2">Order ID</th>
              <th className="border p-2">Customer Name</th>
              <th className="border p-2">Total Amount</th>
              <th className="border p-2">Status</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td className="border p-2">{order.id}</td>
                <td className="border p-2">{order.customerName}</td>
                <td className="border p-2">{order.totalAmount}</td>
                <td className="border p-2">{order.status}</td>
                <td className="border p-2">
                  {order.status === 'Pending' ? (
                    <button onClick={() => handleStatusChange(order.id)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-6">Confirm Order</button>
                  ) : (
                    <button onClick={() => handleStatusChange(order.id)} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-6">Mark as Pending</button>
                  )}
                  <button onClick={() => handleCancelOrder(order.id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-6">Cancel Order</button>
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
