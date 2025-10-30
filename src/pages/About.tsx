import React from 'react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Arch AI Tool - Your Comprehensive Guide to AI Architecture Tools';
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">About Arch AI Tool - Your Guide to AI Architecture</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600">About page content coming soon</p>
        </div>
      </div>
    </div>
  );
};

export default About;