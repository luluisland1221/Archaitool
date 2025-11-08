import React from 'react';
import { Mail } from 'lucide-react';

const FloatingContact = () => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between py-3">
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 text-gray-600" />
            <span className="text-sm text-gray-600">Need help? Reach us at service@archaitool.com</span>
          </div>
          <a
            href="/contact"
            className="inline-flex items-center px-4 py-1 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-900 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default FloatingContact;