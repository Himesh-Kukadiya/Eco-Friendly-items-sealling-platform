import { Link } from 'react-router-dom';
import category from '../assets/Product/Category_Image.js';

const CategoryImageSlider = () => {
  return (
    <div className="flex overflow-x-auto">
      {category.map((categoryItem, index) => (
        <div key={index} className="flex-shrink-0 mr-4">
          <Link to={`/category/${categoryItem.name}`}>
            <img src={categoryItem.image} alt={categoryItem.name} className="w-32 h-32 object-cover rounded-full" />    
            <p className="text-center">{categoryItem.name}</p> 
          </Link>
        </div>
      ))}
    </div>
  );
};

export default CategoryImageSlider;
