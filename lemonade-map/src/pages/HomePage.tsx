import React from "react";
import { MapPage } from "../components/map";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import LemonadeMapLogo from "/images/markers/lemonade-map-logo.png";
import { LoadingIndicator } from "../components/ui";

const featureItems = [
  "Easily find young entrepreneurs near you",
  "Real-time updates and locations",
  "Community reviews and ratings",
  "Support children learning business skills",
  "Turn everyday walks into fun adventures",
];

const HomePage: React.FC = () => {
  const { isAuthenticated, initializing } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-8 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-6 md:p-8">
              <h1 className="text-4xl md:text-5xl font-display font-bold text-lemonade-blue-dark mb-4">
                Welcome to Lemonade Map!
              </h1>
              <p className="text-lg text-gray-700 mb-6">
                Discover and support young entrepreneurs in your neighborhood.
                From refreshing lemonade stands to creative crafts, we're
                putting kids' first businesses on the map!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <Link
                  to={isAuthenticated ? "/seller/dashboard" : "/login"}
                  className="bg-lemonade-yellow hover:bg-yellow-400 text-lemonade-blue-dark font-bold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                >
                  Add Your Stand
                </Link>
                <Link
                  to="/about"
                  className="bg-lemonade-blue-dark hover:bg-lemonade-blue text-white font-bold py-3 px-6 rounded-lg text-center transition-colors duration-200"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Why Lemonade Map? */}
            <div className="md:w-1/2 bg-yellow-100 p-6 flex items-center justify-center">
              <div
                className="bg-white rounded-lg p-5 shadow-md w-full
                              flex flex-col md:flex-row items-start"
              >
                {/* Text */}
                <div className="flex-1">
                  <h2 className="text-2xl font-semibold text-lemonade-blue-dark mb-4 flex items-center">
                    <span className="text-yellow-500 text-3xl mr-2">★</span>
                    Why Lemonade Map?
                  </h2>
                  <ul className="space-y-3">
                    {featureItems.map((item) => (
                      <li key={item} className="flex items-start">
                        <span className="text-yellow-500 text-lg mr-2">•</span>
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Logo */}
                <div className="mt-6 md:mt-0 md:ml-6 flex-shrink-0 mx-auto">
                  <img
                    src={LemonadeMapLogo}
                    alt="Lemonade Map Logo"
                    className="w-64 h-64 object-contain mx-auto"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Stands Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-display font-bold text-lemonade-blue-dark">
              Featured Stands Near You
            </h2>
            <Link
              to="/stands"
              className="text-lemonade-blue hover:text-lemonade-blue-dark font-medium"
            >
              View All →
            </Link>
          </div>
          
          {initializing ? (
            <div className="flex justify-center py-8">
              <LoadingIndicator 
                size="md" 
                variant="yellow" 
                message="Loading featured stands..." 
              />
            </div>
          ) : isAuthenticated ? (
            <div className="flex overflow-x-auto pb-4 gap-4 hide-scrollbar">
              {/* placeholder cards */}
              {[
                "Sarah's Sweet Lemonade",
                "Max's Marvelous Drinks",
                "Neighborhood Refreshments",
              ].map((name, i) => (
                <div
                  key={i}
                  className="min-w-[260px] bg-white p-4 rounded-lg shadow-md"
                >
                  <div className="h-32 bg-yellow-200 rounded-md mb-3"></div>
                  <h3 className="font-bold">{name}</h3>
                  <p className="text-sm text-gray-600">
                    {i === 0
                      ? "0.8 miles away"
                      : i === 1
                      ? "1.2 miles away"
                      : "1.5 miles away"}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-yellow-50 rounded-lg p-6 text-center">
              <p className="text-gray-700 mb-4">
                Sign in to see featured stands in your area!
              </p>
              <Link
                to="/login"
                className="inline-block bg-lemonade-yellow hover:bg-yellow-400 text-lemonade-blue-dark font-bold py-2 px-4 rounded-lg"
              >
                Sign In
              </Link>
            </div>
          )}
        </div>

        {/* Map Section */}
        <div className="bg-white rounded-xl shadow-lg p-4 mb-8">
          <div className="h-[120%] rounded-lg overflow-hidden p-4">
            <MapPage mapHeight="100%" />
          </div>
        </div>

        {/* Community Impact - Introduce once sufficient user base */}
        {/*
        <div className="bg-lemonade-blue-light text-white rounded-xl p-6 mb-8">
          <h2 className="text-2xl font-display font-bold mb-4">
            Our Community Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">500+</div>
              <div>Young Entrepreneurs</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">75</div>
              <div>Cities Covered</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">10k+</div>
              <div>Community Members</div>
            </div>
          </div>
        </div> 
        */}

        {/* Call to Action */}
        <div className="bg-yellow-100 rounded-xl p-6 text-center">
          <h2 className="text-2xl font-display font-bold text-lemonade-blue-dark mb-4">
            Ready to Join Our Community?
          </h2>
          <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
            Whether you're a young entrepreneur looking to promote your stand or
            a community member eager to support local kids, Lemonade Map is for
            you!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/seller/dashboard" : "/login"}
              className="bg-lemonade-yellow hover:bg-yellow-400 text-lemonade-blue-dark font-bold py-3 px-6 rounded-lg"
            >
              Add Your Stand
            </Link>
            <Link
              to="/about"
              className="bg-lemonade-blue-dark hover:bg-lemonade-blue text-white font-bold py-3 px-6 rounded-lg"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
