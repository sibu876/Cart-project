import React, { useEffect } from 'react';

const Footer = () => {
  useEffect(() => {
    
    const script = document.createElement('script');
    script.src = "https://kit.fontawesome.com/a076d05399.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script); 
    };
  }, []);

  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com/sibghatullah.sibghatullah.984" className="text-white hover:text-gray-400">
            <i className="fab fa-facebook fa-2x"></i>
          </a>
          <a href="https://www.instagram.com/sibghatull_ah" className="text-white hover:text-gray-400">
            <i className="fab fa-instagram fa-2x"></i>
          </a>
          <a href="https://wa.me/7295081356" target="_blank" className="text-white hover:text-gray-400">
            <i className="fab fa-whatsapp fa-2x"></i>
          </a>
          <a href="https://twitter.com/@sibghat90530901" className="text-white hover:text-gray-400">
            <i className="fab fa-twitter fa-2x"></i> 
          </a>
          <a href="https://www.linkedin.com/in/sibghatullah-sibu-b130a4244" target='_blank' className="text-white hover:text-gray-400">
            <i className="fab fa-linkedin fa-2x"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-github fa-2x"></i>
          </a>
          <a href="#" className="text-white hover:text-gray-400">
            <i className="fab fa-youtube fa-2x"></i>
          </a>
        </div>

        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <h4 className="font-semibold text-lg ">For Boys</h4>
            <ul className="space-y-2 text-gray-400 italic">
              <li><a href="#" className="hover:text-gray-200">Shirts</a></li>
              <li><a href="#" className="hover:text-gray-200">Pants</a></li>
              <li><a href="#" className="hover:text-gray-200">Shoes</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg ">For Girls</h4>
            <ul className="space-y-2 text-gray-400 italic">
              <li><a href="#" className="hover:text-gray-200">Dresses</a></li>
              <li><a href="#" className="hover:text-gray-200">Skirts</a></li>
              <li><a href="#" className="hover:text-gray-200">Jewelry</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg">Home Furnishing</h4>
            <ul className="space-y-2 text-gray-400 italic">
              <li><a href="#" className="hover:text-gray-200">Couches</a></li>
              <li><a href="#" className="hover:text-gray-200">Tables</a></li>
              <li><a href="#" className="hover:text-gray-200">Decor</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg">For Play</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#" className="hover:text-gray-200">Toys</a></li>
              <li><a href="#" className="hover:text-gray-200">Games</a></li>
              <li><a href="#" className="hover:text-gray-200">Sports</a></li>
            </ul>
          </div>
        </div>

       
        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>&copy; 2024 my Company. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
