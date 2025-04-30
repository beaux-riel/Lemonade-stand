import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import LemonadeMapLogo from "/images/markers/lemonade-map-logo-transparent.png";

const AboutPage = () => {
  const { isAuthenticated } = useAuth();

  // Step-by-step process data
  const steps = [
    {
      title: "Plan Your Stand",
      description: "Choose your location, decide on your menu, and gather supplies.",
      icon: "📝",
      color: "bg-lemonade-yellow",
    },
    {
      title: "Register on Lemonade Map",
      description: "Create an account and add your stand to our map.",
      icon: "📱",
      color: "bg-lemonade-blue-light",
    },
    {
      title: "Set Up Your Stand",
      description: "Build your stand, make your signs, and prepare your products.",
      icon: "🏗️",
      color: "bg-lemonade-pink-light",
    },
    {
      title: "Open for Business",
      description: "Start selling and update your status on Lemonade Map.",
      icon: "🍋",
      color: "bg-lemonade-yellow-light",
    },
    {
      title: "Grow Your Business",
      description: "Collect reviews, expand your menu, and build your customer base.",
      icon: "📈",
      color: "bg-lemonade-blue",
    },
  ];

  // Benefits data
  const benefits = [
    {
      title: "For Young Entrepreneurs",
      items: [
        "Put your stand on the map for more customers",
        "Learn business skills in a fun, supportive environment",
        "Build confidence and communication skills",
        "Track your sales and growth over time",
        "Connect with other young business owners"
      ],
      icon: "👧👦",
      color: "bg-gradient-to-br from-lemonade-yellow to-lemonade-yellow-light"
    },
    {
      title: "For Parents",
      items: [
        "Support your child's entrepreneurial spirit",
        "Help them learn real-world business skills",
        "Create family bonding opportunities",
        "Teach responsibility and financial literacy",
        "Connect with your community"
      ],
      icon: "👨‍👩‍👧‍👦",
      color: "bg-gradient-to-br from-lemonade-blue-light to-lemonade-blue"
    },
    {
      title: "For Communities",
      items: [
        "Discover local stands in your neighborhood",
        "Support the next generation of entrepreneurs",
        "Create stronger community connections",
        "Enjoy fresh, local products",
        "Make everyday walks more fun and purposeful"
      ],
      icon: "🏙️",
      color: "bg-gradient-to-br from-lemonade-pink-light to-lemonade-pink"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="mb-12 text-center">
          <div className="inline-block animate-bounce-slow mb-4">
            <img
              src={LemonadeMapLogo}
              alt="Lemonade Map Logo"
              className="w-32 h-32 object-contain"
            />
          </div>
          <h1 className="text-5xl md:text-6xl font-display font-bold text-lemonade-blue-dark mb-6">
            About Lemonade Map
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empowering young entrepreneurs and connecting communities through
            the time-honored tradition of lemonade stands and other kid-run
            businesses.
          </p>
        </div>

        {/* Our Mission Section */}
        <div className="mb-16 bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl font-display font-bold text-lemonade-blue-dark mb-4">
                Our Mission
              </h2>
              <div className="prose prose-lg text-gray-700">
                <p>
                  At Lemonade Map, we believe that every child has the potential
                  to become an entrepreneur. Our mission is to provide a
                  platform that helps kids learn business skills while
                  connecting them with their communities.
                </p>
                <p>
                  Running a lemonade stand is often a child's first business
                  experience. It teaches valuable lessons about planning,
                  marketing, customer service, and financial management - all in
                  a fun, approachable way.
                </p>
                <p>
                  By putting these stands on the map, we're helping young
                  entrepreneurs reach more customers while giving community
                  members a way to support local kids and enjoy refreshing
                  treats!
                </p>
              </div>
            </div>
            <div className="md:w-1/2 bg-lemonade-yellow-light p-8 flex items-center justify-center">
              <div className="bg-white rounded-lg p-6 shadow-md w-full">
                <h3 className="text-2xl font-semibold text-lemonade-blue-dark mb-4 flex items-center">
                  <span className="text-lemonade-yellow-dark text-3xl mr-2">
                    ★
                  </span>
                  Why It Matters
                </h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow-dark text-xl mr-3">
                      •
                    </span>
                    <div>
                      <span className="font-bold">
                        Entrepreneurship Education:
                      </span>
                      <p className="text-gray-700">
                        Kids learn business fundamentals through hands-on
                        experience
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow-dark text-xl mr-3">
                      •
                    </span>
                    <div>
                      <span className="font-bold">Community Building:</span>
                      <p className="text-gray-700">
                        Creates connections between neighbors and supports local
                        youth
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow-dark text-xl mr-3">
                      •
                    </span>
                    <div>
                      <span className="font-bold">Digital Literacy:</span>
                      <p className="text-gray-700">
                        Introduces kids to technology as a business tool
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow-dark text-xl mr-3">
                      •
                    </span>
                    <div>
                      <span className="font-bold">Financial Education:</span>
                      <p className="text-gray-700">
                        Teaches budgeting, pricing, and profit concepts
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lemonade-blue-dark mb-8 text-center">
            How to Start Your Lemonade Stand
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`${step.color} rounded-xl p-6 shadow-playful transform hover:-translate-y-1 transition-transform duration-300`}
              >
                <div className="text-4xl mb-4">{step.icon}</div>
                <h3 className="text-xl font-bold text-lemonade-blue-dark mb-2">
                  {index + 1}. {step.title}
                </h3>
                <p className="text-gray-700">{step.description}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to={isAuthenticated ? "/seller/dashboard" : "/register"}
              className="bg-lemonade-yellow hover:bg-lemonade-yellow-dark text-lemonade-blue-dark font-bold py-3 px-8 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300"
            >
              Start Your Journey
            </Link>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lemonade-blue-dark mb-8 text-center">
            Benefits for Everyone
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className={`${benefit.color} rounded-xl p-6 shadow-lg`}
              >
                <div className="text-4xl mb-4 text-center">{benefit.icon}</div>
                <h3 className="text-2xl font-bold text-lemonade-blue-dark mb-4 text-center">
                  {benefit.title}
                </h3>
                <ul className="space-y-2">
                  {benefit.items.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <span className="text-lemonade-blue-dark text-lg mr-2">
                        ✓
                      </span>
                      <span className="text-gray-800">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Sponsorship Section */}
        <div className="mb-16 bg-lemonade-blue text-white rounded-xl p-8 shadow-lg">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-display font-bold mb-6 text-center">
              Partner With Us
            </h2>
            <p className="text-xl mb-8 text-center">
              Help us empower the next generation of entrepreneurs through
              sponsorships and partnerships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Sponsorship Opportunities
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Educational workshops and materials</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Starter kits for young entrepreneurs</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Community events and competitions</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Platform development and expansion</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <h3 className="text-2xl font-bold mb-4">
                  Benefits for Sponsors
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Brand visibility to families and communities</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Demonstrate corporate social responsibility</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Support youth entrepreneurship education</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-lemonade-yellow text-lg mr-2">•</span>
                    <span>Connect with local communities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link
                to="/contact"
                className="bg-white text-lemonade-blue-dark hover:bg-lemonade-yellow font-bold py-3 px-8 rounded-lg inline-block transform hover:scale-105 transition-transform duration-300"
              >
                Become a Sponsor
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Section - Introduce once available */}
        {/*
        <div className="mb-16">
          <h2 className="text-3xl font-display font-bold text-lemonade-blue-dark mb-8 text-center">
            Success Stories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-lemonade-yellow text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">
                Lemonade Map helped my daughter's stand get 3x more customers! She's learning 
                about business and having so much fun. Now she's saving for her first investment!
              </p>
              <div className="font-bold text-lemonade-blue-dark">- Sarah's Mom</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-lemonade-yellow text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">
                As a teacher, I love how Lemonade Map makes entrepreneurship accessible to kids. 
                My students are excited about math when it involves calculating their profits!
              </p>
              <div className="font-bold text-lemonade-blue-dark">- Ms. Johnson, 4th Grade Teacher</div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-md">
              <div className="text-lemonade-yellow text-4xl mb-4">"</div>
              <p className="text-gray-700 mb-4">
                Our family loves finding new stands on weekend walks. It's become a tradition to 
                support local kids and their creative business ideas. The lemonade is delicious too!
              </p>
              <div className="font-bold text-lemonade-blue-dark">- The Wilson Family</div>
            </div>
          </div>
        </div> 
        */}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-lemonade-yellow to-lemonade-yellow-light rounded-xl p-8 text-center shadow-lg">
          <h2 className="text-3xl font-display font-bold text-lemonade-blue-dark mb-4">
            Ready to Join the Lemonade Map Community?
          </h2>
          <p className="text-gray-800 mb-8 max-w-2xl mx-auto text-lg">
            Whether you're a young entrepreneur, a supportive parent, or a
            community member, there's a place for you in our growing network.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to={isAuthenticated ? "/seller/dashboard" : "/register"}
              className="bg-lemonade-blue-dark hover:bg-lemonade-blue text-white font-bold py-3 px-6 rounded-lg"
            >
              Register Now
            </Link>
            <Link
              to="/"
              className="bg-white hover:bg-gray-100 text-lemonade-blue-dark font-bold py-3 px-6 rounded-lg border-2 border-lemonade-blue-dark"
            >
              Explore the Map
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;