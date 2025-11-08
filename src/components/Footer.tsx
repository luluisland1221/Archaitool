import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <img src="/logo-footer.webp" alt="Arch AI Tool" className="h-8 mb-4" />
            <p className="text-gray-400">
              Your comprehensive guide to AI tools in architecture and design.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/tools" className="text-gray-400 hover:text-white">
                  All Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/architecture-spatial" className="text-gray-400 hover:text-white">
                  Architecture & Design
                </Link>
              </li>
              <li>
                <Link to="/tools/interior-design" className="text-gray-400 hover:text-white">
                  Interior Design
                </Link>
              </li>
              <li>
                <Link to="/tools/landscape-design" className="text-gray-400 hover:text-white">
                  Landscape Design
                </Link>
              </li>
              <li>
                <Link to="/tools/general-design" className="text-gray-400 hover:text-white">
                  General AI Tools
                </Link>
              </li>
              <li>
                <Link to="/tools/real-estate" className="text-gray-400 hover:text-white">
                  Real Estate
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <p className="text-gray-400">
              Questions? Reach out to us at contact@archaitool.com
            </p>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400">
              &copy; {new Date().getFullYear()} Arch AI Tool. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center space-x-6 text-sm">
              <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;