import Display_limit from './Display_limit';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import ImageSlider from './ImageSlider';
import PropTypes from 'prop-types'
import Productlist from './Productlist';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Home = (props) => {
    const [products, setProducts] = useState([]);
    const [RandomItems, setRandomItems] = useState([]);
    const [images, setImages] = useState([]);
    const [categoryName, setCategoryName] = useState([]);
    const [categoryImages, setCategoryImages] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:7575/getProducts")
            .then((response) => {
                setProducts(response.data);
                const RandomItems = [];
                for (var i = 0; i < 8; i++) {
                    const d = (Math.floor(Math.random() * (response.data.length + 1)));
                    RandomItems.push(response.data[d]);
                    setRandomItems(RandomItems);
                }
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        axios.get("http://localhost:7575/getImages")
            .then((response) => {
                setImages(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        axios.get("http://localhost:7575/getCategoryNames")
            .then((response) => {
                setCategoryName(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        axios.get("http://localhost:7575/getbannerImage")
            .then((response) => {
                setCategoryImages(response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
    }, []);

    const categoryBanners = [];
    // let i = 0;
    let iteration = categoryName.length;
    for (let i = 0; i < iteration;) {
        // Push JSX elements into the 'categoryBanners' array
        categoryBanners.push(
            <div key={i + Date.now()} className="mr-2 mt-3 mb-5 rounded-lg">
                <Link to={`/category/${categoryName[i]}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src={categoryImages[i]} className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
                <div style={{display: 'none'}}>{++i}</div>
                <Link to={`/category/${categoryName[i]}`}>
                    <div className="mr-2 mb-5 rounded-lg">
                        <img src={categoryImages[i]} className="w-60 h-100" alt="Display image" />
                    </div>
                </Link>
                <div style={{display: 'none'}}>{++i}</div>
            </div>
        );
    }

    return (
        <div>
            <ImageSlider images={images} categoryImages={categoryImages}  />
            <div className="bg-gray-100 py-8">
                <div className="flex flex-wrap justify-center">
                    <div className="bg-gray-300 mb-5 mr-2 rounded-lg w-1/4 mt-2 p-4 text-center">
                        <CountUp start={0} end={524890} duration={3} separator="," suffix="+" className="text-green-600 font-bold text-4xl" />
                        <p>ZERO PLASTIC PRODUCTS SOLD</p>
                    </div>

                    <div className="bg-gray-300 mb-5 mr-2 rounded-lg w-1/4 mt-2 p-4 text-center">
                        <CountUp start={0} end={131223} duration={3} separator="," suffix=" Kgs" className="text-green-600 font-bold text-4xl" />
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
                    {categoryBanners}
                </div>
            </div>

            <div className="bg-gray-200">
                <div className="flex flex-wrap justify-center">
                    <p className="font-bold">Product on Earth Heaven</p>
                    <section>
                        <Display_limit products={RandomItems} handleClick={props.handleClick} />
                    </section>
                    <section className="hidden">
                        {products.map(product => (
                            <Productlist key={Date.now() + product._id} product={product} handleClick={product.handleClick} />
                        ))}
                    </section>
                </div>
            </div>
            <br />
        </div>
    )
}

Home.propTypes = {
    handleClick: PropTypes.func,
};
export default Home;