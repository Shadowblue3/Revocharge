import React, { useState, useEffect } from 'react';
import { Zap, Wifi, Phone, Package, TrendingDown, Check, Info, Smartphone, Radio, Database, DollarSign } from 'lucide-react';
import Navbar from './Navbar';

export default function RevoChargePlans() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    const icons = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10
    }));
    setFloatingIcons(icons);
  }, []);

  const filters = [
    { id: 'all', label: 'All Plans', icon: <Package className="w-4 h-4" /> },
    { id: '5g', label: '5G Plans', icon: <Wifi className="w-4 h-4" /> },
    { id: 'voice', label: 'Voice Only', icon: <Phone className="w-4 h-4" /> },
    { id: 'data', label: 'Data Pack', icon: <Database className="w-4 h-4" /> },
    { id: 'savings', label: 'Savings', icon: <TrendingDown className="w-4 h-4" /> }
  ];

  const plans = [
    {
      id: 1,
      name: "Ultra 5G",
      price: 599,
      validity: "84 days",
      category: "5g",
      featured: true,
      data: "2GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["5G Unlimited", "Disney+ Hotstar", "Prime Video Mobile"],
      badge: "Popular"
    },
    {
      id: 2,
      name: "Basic Voice",
      price: 179,
      validity: "28 days",
      category: "voice",
      data: "None",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Voice Only", "All Networks"]
    },
    {
      id: 3,
      name: "Data Booster",
      price: 299,
      validity: "28 days",
      category: "data",
      data: "3GB/day",
      calls: "None",
      sms: "None",
      extras: ["High Speed Data", "Night Free Data 1GB"]
    },
    {
      id: 4,
      name: "Mega Saver",
      price: 2999,
      validity: "365 days",
      category: "savings",
      featured: true,
      data: "2.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Annual Plan", "Best Value", "OTT Subscriptions"],
      badge: "Best Value"
    },
    {
      id: 5,
      name: "Premium 5G Pro",
      price: 799,
      validity: "84 days",
      category: "5g",
      data: "3GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["5G Unlimited", "Netflix Basic", "Amazon Prime", "Disney+ Hotstar"]
    },
    {
      id: 6,
      name: "Talk Time Special",
      price: 129,
      validity: "18 days",
      category: "voice",
      data: "None",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Voice Only", "Weekend Bonus"]
    },
    {
      id: 7,
      name: "Data Pro",
      price: 449,
      validity: "56 days",
      category: "data",
      data: "2GB/day",
      calls: "None",
      sms: "None",
      extras: ["High Speed Data", "Night Free Data 2GB", "Weekend Unlimited"]
    },
    {
      id: 8,
      name: "Smart Saver",
      price: 1499,
      validity: "180 days",
      category: "savings",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Half-Yearly Plan", "Great Savings", "OTT Benefits"]
    },
    {
      id: 9,
      name: "5G Starter",
      price: 349,
      validity: "28 days",
      category: "5g",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["5G Unlimited", "Basic OTT"]
    },
    {
      id: 10,
      name: "Express Voice",
      price: 99,
      validity: "10 days",
      category: "voice",
      data: "None",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Voice Only", "All Networks", "Quick Recharge"]
    },
    {
      id: 11,
      name: "Data Express",
      price: 199,
      validity: "14 days",
      category: "data",
      data: "1GB/day",
      calls: "None",
      sms: "None",
      extras: ["High Speed Data", "Quick Pack"]
    },
    {
      id: 12,
      name: "Budget Saver",
      price: 719,
      validity: "84 days",
      category: "savings",
      data: "1.5GB/day",
      calls: "Unlimited",
      sms: "100/day",
      extras: ["Long Validity", "Good Value", "Free Data Sharing"]
    }
  ];

  const filteredPlans = selectedFilter === 'all' 
    ? plans 
    : plans.filter(plan => plan.category === selectedFilter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 relative overflow-hidden">
        
      {/* Floating SVG Icons Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute opacity-5 animate-float-complex"
            style={{
              left: `${icon.left}%`,
              top: `${icon.top}%`,
              animationDelay: `${icon.delay}s`,
              animationDuration: `${icon.duration}s`
            }}
          >
            {icon.id % 5 === 0 ? (
              <Smartphone className="w-16 h-16 text-orange-600" />
            ) : icon.id % 5 === 1 ? (
              <Wifi className="w-16 h-16 text-blue-600" />
            ) : icon.id % 5 === 2 ? (
              <Phone className="w-16 h-16 text-green-600" />
            ) : icon.id % 5 === 3 ? (
              <Database className="w-16 h-16 text-purple-600" />
            ) : (
              <Zap className="w-16 h-16 text-orange-600" />
            )}
          </div>
        ))}
      </div>
        <Navbar/>
      {/* Header Section */}
      <div className="relative z-10 pt-24 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 animate-fade-in-up">
            <span className="px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-semibold shadow-md">
              📱 Choose Your Perfect Plan
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            Our Recharge
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-800 bg-clip-text text-transparent">
              Plans & Offers
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Find the perfect plan that suits your needs. From unlimited calls to high-speed data, we've got you covered.
          </p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 mb-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {filters.map((filter, index) => (
              <button
                key={filter.id}
                onClick={() => setSelectedFilter(filter.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 hover:-translate-y-1 shadow-md hover:shadow-lg animate-fade-in-up ${
                  selectedFilter === filter.id
                    ? 'bg-gradient-to-r from-orange-600 to-orange-700 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {filter.icon}
                <span>{filter.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Plans Grid */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPlans.map((plan, index) => (
              <div
                key={plan.id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 relative overflow-hidden group"
                style={{
                  animation: 'fade-in-up 0.6s ease-out forwards',
                  animationDelay: `${index * 0.1}s`,
                  opacity: 0
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) translateY(-8px)`;
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 30}deg) rotateX(${-y / 30}deg) translateY(-8px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
                }}
              >
                {/* Badge */}
                {plan.badge && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {plan.badge}
                    </span>
                  </div>
                )}

                {/* Featured Highlight */}
                {plan.featured && (
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-5"></div>
                )}

                <div className="p-8 relative z-10">
                  {/* Plan Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-orange-600 transition-colors">
                      {plan.name}
                    </h3>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-orange-600">₹{plan.price}</span>
                      <span className="text-gray-500 ml-2">/ {plan.validity}</span>
                    </div>
                  </div>

                  {/* Plan Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-gray-700">
                      <Database className="w-5 h-5 text-orange-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">Data:</span>
                      <span className="ml-2">{plan.data}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Phone className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">Calls:</span>
                      <span className="ml-2">{plan.calls}</span>
                    </div>
                    <div className="flex items-center text-gray-700">
                      <Radio className="w-5 h-5 text-blue-500 mr-3 flex-shrink-0" />
                      <span className="font-medium">SMS:</span>
                      <span className="ml-2">{plan.sms}</span>
                    </div>
                  </div>

                  {/* Extras */}
                  <div className="mb-6">
                    <div className="text-sm font-semibold text-gray-700 mb-2">Extras:</div>
                    <div className="space-y-2">
                      {plan.extras.map((extra, i) => (
                        <div key={i} className="flex items-start">
                          <Check className="w-4 h-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">{extra}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="w-full py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-md hover:shadow-lg flex items-center justify-center space-x-2 group-hover:shadow-orange-200">
                    <Zap className="w-5 h-5" />
                    <span>Recharge Now</span>
                  </button>

                  {/* Info Icon */}
                  <button className="absolute bottom-4 right-4 p-2 text-gray-400 hover:text-orange-600 transition-colors">
                    <Info className="w-5 h-5" />
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 border-2 border-orange-400 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
              </div>
            ))}
          </div>

          {/* No Results Message */}
          {filteredPlans.length === 0 && (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No plans found</h3>
              <p className="text-gray-600">Try selecting a different filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Info Banner */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 text-white shadow-xl">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Need help choosing a plan?</h3>
                <p className="text-orange-100">Our experts are here to help you find the perfect plan for your needs.</p>
              </div>
              <button className="px-8 py-3 bg-white text-orange-600 rounded-xl font-semibold hover:bg-orange-50 transition-all transform hover:scale-105 shadow-lg whitespace-nowrap">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes float-complex {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(30px, -30px) rotate(90deg);
          }
          50% {
            transform: translate(-20px, -50px) rotate(180deg);
          }
          75% {
            transform: translate(-30px, -20px) rotate(270deg);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }
        .animate-float-complex {
          animation: float-complex ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}