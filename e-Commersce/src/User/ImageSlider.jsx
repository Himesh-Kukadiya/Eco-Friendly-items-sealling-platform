import { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import CategoryImageSlider from './CategoryImageSlider ';

const ImageSlider = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  return (
    <>
    <CategoryImageSlider/>
    <div className="relative">
      <button className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" onClick={prevSlide}>
      &lt;
      
      </button>
      <button className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white px-2 py-1 rounded" onClick={nextSlide}>
      &gt;
      </button>
      <div className="flex">
        {images && images.length > 0 && images.map((image, index) => (
          <div
            key={index}
            className={`w-full ${index === currentIndex ? 'block' : 'hidden'} transition-opacity duration-500`}
          >
            <img src={image} alt={`Slide ${index + 1}`} className="w-full" />
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

ImageSlider.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired // Define prop type validation
};

export default ImageSlider;
