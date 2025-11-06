import React from 'react';
import { useEffect } from 'react';

const About = () => {
  useEffect(() => {
    document.title = 'About Arch AI Tool - Best Architecture AI Tools & Free Solutions';
  }, []);

  return (
    <div className="min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">About Arch AI Tool - Your Guide to Architecture AI Tools</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <p className="text-gray-600 mb-4">
            Welcome to the most comprehensive architecture ai tools list on the internet. We help professionals discover the best free ai tools for architecture design, visualization, and planning.
          </p>
          <p className="text-gray-600 mb-4">
            Our mission is to connect you with top-rated ai tools for architecture plans, portfolio creation, and interior design tools. Whether you're looking for landscape design solutions or comprehensive options for architecture and interior design, we've got you covered.
          </p>
          <p className="text-gray-600">
            Discover why professionals trust our curated architecture ai tools directory to find the perfect tools for their projects.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;