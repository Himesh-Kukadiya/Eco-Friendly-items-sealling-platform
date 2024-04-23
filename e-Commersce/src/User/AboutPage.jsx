import Navbar from './Navbar';
import Footer from './Footer';
const AboutPage = () => {
  return (
    <>
    
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">About Us</h1>
      <div className="relative w-80 h-80 overflow-hidden rounded-lg perspective">
        <div className="absolute inset-0 w-full h-full bg-gray-800 rounded-lg transform transition-transform duration-500 hover:rotate-y-180"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            className="w-60 h-60 object-cover rounded-full border-4 border-white shadow-lg"
            src="https://source.unsplash.com/random/800x800"
            alt="About us"
          />
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutPage;
