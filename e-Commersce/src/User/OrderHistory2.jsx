

const OrderHistory = () => {
  const orders = [
    { id: 1, date: '2024-03-28', total: 25.99 },
    { id: 2, date: '2024-03-25', total: 19.99 },
    // Add more orders as needed
  ];

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-semibold mb-4">Order History</h1>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {orders.map(order => (
          <div key={order.id} className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Order #{order.id}</h2>
            <p className="text-gray-600 mb-1">Date: {order.date}</p>
            <p className="text-gray-600 mb-1">Total: ${order.total}</p>
            {/* Add more details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderHistory;
