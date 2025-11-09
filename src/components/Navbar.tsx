import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <nav className="bg-white border-b border-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img src="/logo-navbar.webp" alt="Arch AI Tool" className="h-12" />
            </Link>
          </div>

          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-8">
            <Link to="/" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Home
            </Link>
            <Link to="/tools" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Tools
            </Link>
            <Link to="/blog" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Blog
            </Link>
            <Link to="/about" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              About
            </Link>
            <Link to="/contact" className="text-black hover:text-gray-600 px-3 py-2 text-sm font-medium">
              Contact
            </Link>
          </div>

          <div className="sm:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:text-gray-600"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div id="mobile-menu" className="sm:hidden border-t border-black">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link
              to="/"
              className="block px-3 py-2 text-black hover:bg-black hover:text-white text-base font-medium"
            >
              Home
            </Link>
            <Link
              to="/tools"
              className="block px-3 py-2 text-black hover:bg-black hover:text-white text-base font-medium"
            >
              Tools
            </Link>
            <Link
              to="/blog"
              className="block px-3 py-2 text-black hover:bg-black hover:text-white text-base font-medium"
            >
              Blog
            </Link>
            <Link
              to="/about"
              className="block px-3 py-2 text-black hover:bg-black hover:text-white text-base font-medium"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="block px-3 py-2 text-black hover:bg-black hover:text-white text-base font-medium"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;