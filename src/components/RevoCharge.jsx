import React, { useState, useEffect } from 'react';
import { Smartphone, Zap, Wifi, Shield, ArrowRight, Menu, X } from 'lucide-react';
import Navbar from './Navbar';

export default function RevoCharge() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [pulseCircles, setPulseCircles] = useState([]);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseCircles(prev => [
        ...prev,
        { id: Date.now(), x: Math.random() * 100, y: Math.random() * 100 }
      ].slice(-5));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      
    <Navbar/>
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {pulseCircles.map((circle) => (
            <div
              key={circle.id}
              className="absolute w-64 h-64 bg-orange-400 rounded-full opacity-10 animate-pulse"
              style={{
                left: `${circle.x}%`,
                top: `${circle.y}%`,
                animation: 'pulse 3s ease-out forwards'
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 animate-fade-in">
              <div className="inline-block">
                <span className="px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                  ⚡ Instant Recharge Solution
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Recharge Your
                <span className="block bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  Mobile Instantly
                </span>
              </h1>
              
              <p className="text-xl text-gray-600">
                Experience lightning-fast mobile recharges with exclusive cashback offers and instant data sharing. Your one-stop solution for all telecom needs.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="group px-8 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-xl flex items-center justify-center space-x-2">
                  <span>Get Started</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 border-2 border-orange-600 text-orange-600 rounded-full font-semibold hover:bg-orange-50 transition-all">
                  View Plans
                </button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8">
                <div>
                  <div className="text-3xl font-bold text-orange-600">50K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">99.9%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-600">24/7</div>
                  <div className="text-sm text-gray-600">Support</div>
                </div>
              </div>
            </div>

            {/* Right Content - Animated Phone */}
            <div className="relative">
              <div className="relative mx-auto w-64 h-96 animate-float">
                {/* Phone Frame */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden">
                  {/* Screen */}
                  <div className="m-3 h-full bg-white rounded-2xl overflow-hidden">
                    {/* Status Bar */}
                    <div className="bg-orange-600 h-8 flex items-center justify-between px-4">
                      <span className="text-white text-xs font-semibold">RevoCharge</span>
                      <div className="flex space-x-1">
                        <div className="w-1 h-3 bg-white rounded"></div>
                        <div className="w-1 h-3 bg-white rounded"></div>
                        <div className="w-1 h-3 bg-white rounded opacity-50"></div>
                      </div>
                    </div>
                    
                    {/* Screen Content */}
                    <div className="p-4 space-y-4">
                      <div className="text-center py-6">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
                          <Zap className="w-8 h-8 text-white" fill="currentColor" />
                        </div>
                        <p className="mt-3 text-sm font-semibold text-gray-700">Recharging...</p>
                      </div>
                      
                      {/* Animated Progress Bars */}
                      <div className="space-y-2">
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress"></div>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-orange-500 to-orange-600 rounded-full animate-progress-delay"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <div className="absolute -left-8 top-20 animate-float-delay">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <Wifi className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="absolute -right-8 top-40 animate-float">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <div className="absolute -left-4 bottom-32 animate-float-delay">
                  <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
              </div>

              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes float-delay {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 70%; }
          100% { width: 100%; }
        }
        @keyframes progress-delay {
          0% { width: 0%; }
          60% { width: 0%; }
          100% { width: 85%; }
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animate-float-delay {
          animation: float-delay 3s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress 2s ease-in-out infinite;
        }
        .animate-progress-delay {
          animation: progress-delay 2s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}