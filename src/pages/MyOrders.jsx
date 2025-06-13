import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/MyOrders.css';
import BackToHome from '../components/BackToHome';
function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/myorders', {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        setOrders(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to load orders:', error);
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user.token]);

  if (loading) return <p>Loading your orders...</p>;

  return (
    <div className="container mt-4">
      <BackToHome/>
      <h2>My Orders</h2>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Payment</th>
            <th>Details</th>
          </tr>
        </thead>
       <tbody>
  {orders.map(order => (
    <tr key={order._id}>
      <td data-label="Order ID">{order._id}</td>
      <td data-label="Date">{new Date(order.createdAt).toLocaleDateString()}</td>
      <td data-label="Total">₹{order.totalPrice.toFixed(2)}</td>
      <td data-label="Payment">{order.paymentMethod}</td>
      <td data-label="Details">
        <Link to={`/order/${order._id}`} className="btn btn-sm btn-primary">
          View
        </Link>
      </td>
    </tr>
  ))}
</tbody>

      </table>
    </div>
  );
}

export default MyOrders;
