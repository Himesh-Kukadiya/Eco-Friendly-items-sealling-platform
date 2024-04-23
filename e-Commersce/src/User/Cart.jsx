import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';


const Cart = ({ cart, setCart }) => {
    const [price, setPrice] = useState(0);
    const [counts, setCounts] = useState({}); // State to store counts for each item
    

    // Function to increment or decrement the count for a specific item
    const handleCountChange = (id, delta) => {
        const currentCount = counts[id] || 1;
        const newCount = Math.max(currentCount + delta, 1); // Ensure count doesn't go below 0
        setCounts(prevCounts => ({ ...prevCounts, [id]: newCount }));
    };

    const calculatePrice = () => {
        let totalPrice = 0;
        cart.forEach(item => {
            totalPrice += (counts[item.id] || 1) * item.price; // Use the count from the counts state
        });
        setPrice(totalPrice);
    };

    useEffect(() => {
        calculatePrice();
    }, [cart, counts]);

    // Function to handle removing an item from the cart
    const handleRemove = (id) => {
        // Remove the item from the cart
        const updatedCart = cart.filter(item => item.id !== id);
        setCart(updatedCart);

        // Reset the count for the removed item to 1
        setCounts(prevCounts => {
            const updatedCounts = { ...prevCounts };
            delete updatedCounts[id]; // Remove the count for the removed item
            return updatedCounts;
        });
    };

    useEffect(() => {
        // Initialize counts for items in the cart
        const initialCounts = {};
        cart.forEach(item => {
            initialCounts[item.id] = 1;
        });
        setCounts(initialCounts);
    }, [cart]);

    // Function to handle proceeding to checkout or some other action
    const handleProceed = () => {
        // Extracting only the IDs from the cart array
        const cartIds = cart.map(item => item.sellerId);
        
        const cartIdsString = cartIds; // Joining IDs into a comma-separated string

        const cartIdsEncoded = encodeURIComponent(cartIdsString); // Encoding the string for URL
        
        // Decode the encoded string
        const decodedString = decodeURIComponent(cartIdsEncoded);

        // Split the decoded string into an array using commas as the delimiter
        const sellerIdsArray = decodedString.split(',');

        console.log(sellerIdsArray);
        // Constructing the URL with cart IDs as a query parameter
        window.location.href = `/address?sellerIds=${sellerIdsArray}`;
        
    };

    return (
        <article className="p-4">
            {cart.length === 0 ? (
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
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td className="border px-4 py-2">
                                        <img src={item.banner} alt={item.title} className="h-16 w-16 object-cover" />
                                    </td>
                                    <td className="border px-4 py-2">
                                        <button className="px-2 py-1 bg-gray-200 rounded-md" onClick={() => handleCountChange(item.id, +1)}>+</button>
                                        <span className="px-2">{counts[item.id] || 1}</span> {/* Use the count from counts state */}
                                        <button className="px-2 py-1 bg-gray-200 rounded-md" onClick={() => handleCountChange(item.id, -1)}>-</button>
                                    </td>
                                    <td className="border px-4 py-2">${item.price}</td>
                                    <td className="border px-4 py-2">
                                        <button onClick={() => handleRemove(item.id)} className="px-2 py-1 bg-red-500 text-white rounded-md">Remove</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="mt-4">
                        <span className="font-bold">Total Price: ${price}</span>
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
            id: PropTypes.string.isRequired,
            banner: PropTypes.string.isRequired,
            price: PropTypes.number.isRequired,
            amount: PropTypes.number, // Make the amount prop optional
            title: PropTypes.string.isRequired
            // Add other required properties of item object here
        })
    ).isRequired,
    setCart: PropTypes.func.isRequired,
};


export default Cart;
