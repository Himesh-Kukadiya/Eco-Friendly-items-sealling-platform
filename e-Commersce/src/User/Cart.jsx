import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Cart = (props) => {
    const navigate = useNavigate();
    const [counts, setCounts] = useState({}); // State to store counts for each item

    useEffect(() => {
        calculatePrice();
    }, [props.cart, counts]);

    function calculatePrice() {
        let totalPrice = 0;
        props.cart.forEach(item => {
            totalPrice += (counts[item._id] || 1) * item.price; // Use the count from the counts state
        });
        props.setPrice(totalPrice);
    }

    // Function to increment or decrement the count for a specific item
    const handleCountChange = (id, delta) => {
        const currentCount = counts[id] || 1;
        const newCount = Math.max(currentCount + delta, 1); // Ensure count doesn't go below 0

        setCounts(prevCounts => ({ ...prevCounts, [id]: newCount }));

        axios
            .post("http://localhost:7575/updateQuantity", { id, quantity: newCount })
            .then((response) => {
                console.log(response.data.message);
            })
            .catch((error) => console.log(error.response.data.message));
    };

    // Function to handle removing an item from the cart
    const handleRemove = (id) => {
        // Remove the item from the cart
        const updatedCart = props.cart.filter(item => item._id !== id);
        props.setCart(updatedCart);

        // Reset the count for the removed item to 1
        setCounts(prevCounts => {
            const updatedCounts = { ...prevCounts };
            delete updatedCounts[id]; // Remove the count for the removed item
            return updatedCounts;
        });

        axios
            .post("http://localhost:7575/removeFromCart", { id })
            .then((response) => {
                console.log(response.data.message);
            })
    };

    useEffect(() => {
        // Initialize counts for items in the cart
        const initialCounts = {};
        props.cart.forEach(item => {
            initialCounts[item._id] = item.quantity;
        });
        setCounts(initialCounts);
    }, [props.cart]);

    const handleProceed = () => {
        // Constructing the URL with cart IDs as a query parameter
        navigate(`/address`);
    };

    return (
        <article className="p-4">
            {props.cart.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <>
                    <table className="table-auto w-full">
                        <thead>
                            <tr>
                                <th className="px-4 py-2">Banner</th>
                                <th className="px-4 py-2">Quantity</th>
                                <th className="px-4 py-2">Price</th>
                                <th className="px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {props.cart.map(item => (
                                <tr key={item.P_id}>
                                    <td className="border px-4 py-2">
                                        <center>
                                        <img src={item.banner} alt={item.title} className="h-20 w-20 object-cover" style={{borderRadius: 100, boxShadow: "2px 2px 10px black"}} />
                                        </center>
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button className="px-2 py-1 bg-gray-200 rounded-md" onClick={() => { handleCountChange(item._id, 1);}}>+</button>
                                        <span className="px-2">{counts[item._id] || 1}</span> {/* Use the count from counts state */}
                                        <button className="px-2 py-1 bg-gray-200 rounded-md" onClick={() => { handleCountChange(item._id, -1); }}>-</button>
                                    </td>
                                    <td className="border px-4 py-2">₹ {item.price}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleRemove(item._id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <span className="font-bold">Total Price: ₹ {props.price}</span>
                    </div>
                    <button onClick={handleProceed} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md">Proceed</button>
                </>
            )}
        </article>
    );
};

Cart.propTypes = {
    cart: PropTypes.arrayOf(
        PropTypes.shape({
            P_id: PropTypes.string.isRequired,
            banner: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            amount: PropTypes.number, // Make the amount prop optional
            title: PropTypes.string.isRequired
            // Add other required properties of item object here
        })
    ).isRequired,
    setCart: PropTypes.func.isRequired,
    price: PropTypes.number.isRequired,
    setPrice: PropTypes.func.isRequired
};


export default Cart;
