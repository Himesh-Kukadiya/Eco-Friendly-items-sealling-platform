import  Display_limit from './Display_limit';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Navbar from './Navbar';
import ImageSlider from './ImageSlider';
import products from '../assets/Product/product';
import PropTypes from 'prop-types'
import Productlist from './Productlist';
import { useEffect, useState } from 'react';

 const Home =({handleClick}) => {
    const images = [
        "src/assets/Images/image 9.svg",
        "src/assets/Images/Elephent.svg",
        "src/assets/Images/image 23.svg",
      ];
      var Tyer = 'Tyer';
      var Terracotta = 'Terracotta';
      var Fabric = 'Fabric';
      var Bambo = 'Bamboo';
      var Crok = 'Crock';
      var Copper = 'Copper';
      var Coconut = 'Coconut';
      var Wood = 'Wood';

      const [firstEightProducts, setFirstEightProducts] = useState([]);

    useEffect(() => {
        const uniqueProducts = selectUniqueProducts(8);
        setFirstEightProducts(uniqueProducts);
    }, []);

    // Function to select unique random products
    const selectUniqueProducts = (count) => {
        const shuffledProducts = products.sort(() => Math.random() - 0.5);
        const uniqueProducts = [];
        const productIds = new Set();

        for (const product of shuffledProducts) {
            if (!productIds.has(product.id)) {
                uniqueProducts.push(product);
                productIds.add(product.id);
            }

            if (uniqueProducts.length === count) break; // Stop when desired count of unique products are found
        }

        return uniqueProducts;
    };


  return (
    <div>
    
    <ImageSlider images={images} />
    <div className="bg-gray-100 py-8">
      <div className="flex flex-wrap justify-center">
        <div className="bg-gray-300 mb-5 mr-2 rounded-lg w-1/4 mt-2 p-4 text-center">
          <CountUp start={0} end={524890} duration={3} separator="," suffix="+" className="text-green-600 font-bold text-4xl" />
          <p>ZERO PLASTIC PRODUCTS SOLD</p>
        </div>

        <div className="bg-gray-300 mb-5 mr-2 rounded-lg w-1/4 mt-2 p-4 text-center">
          <CountUp start={0} end={131223} duration={3} separator="," suffix=" Kgs" className="text-green-600 font-bold text-4xl"/>
          <p>PLASTIC POLLUTION PREVENTED</p>
        </div>

        <div className="bg-gray-300 mb-5 rounded-lg w-1/4 mt-2 p-4 text-center">
          <CountUp start={0} end={34993} duration={3} separator="," suffix=" tons" className="text-green-600 font-bold text-4xl" />
          <p>CARBON EMISSIONS PREVENTED</p>
        </div>
      </div>
    </div>

    <div className="bg-gray-200">
        <div className="flex flex-wrap justify-center">
            <div className="mr-2 mt-3 mb-5 rounded-lg">
            
                <Link to={`/category/${Terracotta}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/terracotta-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
                
                <Link to={`/category/${Bambo}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/bamboo-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
            </div>

            <div className="mr-2 mt-3 mb-5 rounded-lg">
                <Link to={`/category/${Tyer}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/tyre-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>

                <Link to={`/category/${Crok}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/cork-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
                
            </div>

            <div className="mr-2 mt-3 mb-5 rounded-lg">
                <Link to={`/category/${Fabric}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/fabric-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>

                <Link to={`/category/${Copper}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/copper-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
            </div>

            <div className="mr-2 mt-3 mb-5 rounded-lg">
                <Link to={`/category/${Coconut}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/coconut-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>

                <Link to={`/category/${Wood}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src="src/assets/Images/wood-desktop 2.svg" className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
            </div>

        </div>
    </div>

    <div className="bg-gray-200">
        <div className="flex flex-wrap justify-center">
            <p className="font-bold">Product on Earth Heaven</p>
            <section>
                {firstEightProducts.map(product => (
                    <Display_limit key={product.id} product={product} handleClick={handleClick} />
                ))}
            </section>
            <section className="hidden">
                {products.map(product => (
                <Productlist key={product.id} product={product} handleClick={handleClick} />
            ))}
            </section>
        </div>
    </div>
    <br />
</div>

  )
}

Home.propTypes = {
    handleClick: PropTypes.func.isRequired
  };
export default Home;