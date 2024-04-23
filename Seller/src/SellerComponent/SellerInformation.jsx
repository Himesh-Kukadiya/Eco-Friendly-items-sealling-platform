
import PropTypes from 'prop-types';

const SellerInformation = ({ seller }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">Seller Information</h2>
      <div className="flex items-center mb-4">
        <img
          src={seller.avatar}
          alt="Seller Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h3 className="text-xl font-semibold">{seller.name}</h3>
          <p className="text-gray-600">{seller.email}</p>
          <p className="text-gray-600">Location: {seller.location}</p>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">About Me</h4>
        <p className="text-gray-700">{seller.about}</p>
      </div>
    </div>
  );
};

SellerInformation.propTypes = {
  seller: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
    about: PropTypes.string.isRequired,
  }).isRequired,
};

export default SellerInformation;
