import React, { useState, useEffect } from 'react';
import { Zap, Smartphone, Wifi, MessageSquare, Calendar, TrendingUp, Package, Bell, User, LogOut, Menu, X, ChevronRight } from 'lucide-react';
import Navbar from './Navbar';

export default function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [animatedStats, setAnimatedStats] = useState({
    data: 0,
    sms: 0,
    plans: 0,
    validity: 0
  });

  // Mock user data
  const userData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    currentPlan: "Premium Unlimited",
    dataRemaining: 45.5, // GB
    dataTotal: 75, // GB
    smsUsed: 250,
    smsTotal: 500,
    plansPurchased: 12,
    validityDays: 28,
    lastRecharge: "15 Oct 2024",
    nextBilling: "12 Nov 2024"
  };

  // Animate numbers on mount
  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    const timer = setInterval(() => {
      setAnimatedStats(prev => ({
        data: prev.data < userData.dataRemaining ? Math.min(prev.data + (userData.dataRemaining / steps), userData.dataRemaining) : userData.dataRemaining,
        sms: prev.sms < userData.smsUsed ? Math.min(prev.sms + (userData.smsUsed / steps), userData.smsUsed) : userData.smsUsed,
        plans: prev.plans < userData.plansPurchased ? Math.min(prev.plans + (userData.plansPurchased / steps), userData.plansPurchased) : userData.plansPurchased,
        validity: prev.validity < userData.validityDays ? Math.min(prev.validity + (userData.validityDays / steps), userData.validityDays) : userData.validityDays
      }));
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const dataPercentage = (userData.dataRemaining / userData.dataTotal) * 100;
  const smsPercentage = (userData.smsUsed / userData.smsTotal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50">
      
      <Navbar/>

      <div className="flex">
        

        {/* Main Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 mt-20">
          <div className="max-w-7xl mx-auto">
            

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {/* Data Remaining Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in-up border-l-4 border-orange-500" style={{ animationDelay: '0.1s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-orange-100 rounded-xl">
                    <Wifi className="w-6 h-6 text-orange-600" />
                  </div>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    Active
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Data Remaining</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {animatedStats.data.toFixed(1)} <span className="text-lg text-gray-500">GB</span>
                </p>
                <p className="text-xs text-gray-500">of {userData.dataTotal} GB</p>
                <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-orange-500 to-orange-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${dataPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* SMS Used Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in-up border-l-4 border-blue-500" style={{ animationDelay: '0.2s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-blue-600" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-gray-600 text-sm font-semibold mb-2">SMS Used</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {Math.floor(animatedStats.sms)}
                </p>
                <p className="text-xs text-gray-500">of {userData.smsTotal} messages</p>
                <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000"
                    style={{ width: `${smsPercentage}%` }}
                  ></div>
                </div>
              </div>

              {/* Plans Purchased Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in-up border-l-4 border-purple-500" style={{ animationDelay: '0.3s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 rounded-xl">
                    <Package className="w-6 h-6 text-purple-600" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Plans</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {Math.floor(animatedStats.plans)}
                </p>
                <p className="text-xs text-gray-500">Purchased lifetime</p>
                <div className="mt-4 flex items-center text-xs text-purple-600 font-semibold">
                  <span>View History</span>
                  <ChevronRight className="w-4 h-4 ml-1" />
                </div>
              </div>

              {/* Validity Card */}
              <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all animate-fade-in-up border-l-4 border-green-500" style={{ animationDelay: '0.4s' }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 rounded-xl">
                    <Calendar className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    Renewing
                  </span>
                </div>
                <h3 className="text-gray-600 text-sm font-semibold mb-2">Plan Validity</h3>
                <p className="text-3xl font-bold text-gray-900 mb-1">
                  {Math.floor(animatedStats.validity)} <span className="text-lg text-gray-500">days</span>
                </p>
                <p className="text-xs text-gray-500">Until {userData.nextBilling}</p>
                <button className="mt-4 w-full py-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white text-xs font-semibold rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all">
                  Renew Now
                </button>
              </div>
            </div>

            {/* Current Plan Details */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              {/* Plan Info Card */}
              <div className="lg:col-span-2 bg-gradient-to-br from-orange-500 to-orange-700 rounded-2xl p-6 sm:p-8 shadow-xl text-white animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{userData.currentPlan}</h2>
                    <p className="text-orange-100">Your active subscription plan</p>
                  </div>
                  <div className="p-3 bg-white/20 backdrop-blur-sm rounded-xl">
                    <Zap className="w-8 h-8" fill="currentColor" />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-orange-100 text-sm mb-1">Data Allowance</p>
                    <p className="text-2xl font-bold">{userData.dataTotal} GB</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-orange-100 text-sm mb-1">SMS Limit</p>
                    <p className="text-2xl font-bold">{userData.smsTotal}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-orange-100 text-sm mb-1">Last Recharge</p>
                    <p className="text-lg font-semibold">{userData.lastRecharge}</p>
                  </div>
                  <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                    <p className="text-orange-100 text-sm mb-1">Auto-Renew</p>
                    <p className="text-lg font-semibold">Enabled</p>
                  </div>
                </div>

                <button className="w-full py-3 bg-white text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all transform hover:scale-105">
                  Upgrade Plan
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
                <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl hover:from-orange-100 hover:to-orange-200 transition-all group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-orange-500 rounded-lg">
                        <Smartphone className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Recharge Now</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-orange-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl hover:from-blue-100 hover:to-blue-200 transition-all group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <Package className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">Browse Plans</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-blue-600 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-xl hover:from-purple-100 hover:to-purple-200 transition-all group">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 bg-purple-500 rounded-lg">
                        <TrendingUp className="w-5 h-5 text-white" />
                      </div>
                      <span className="font-semibold text-gray-900">View Usage</span>
                    </div>
                    <ChevronRight className="w-5 h-5 text-purple-600 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl p-6 shadow-lg animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-green-100 rounded-full">
                      <Zap className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Plan Recharged</p>
                      <p className="text-sm text-gray-500">Premium Unlimited - ₹599</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{userData.lastRecharge}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Wifi className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">Data Usage Alert</p>
                      <p className="text-sm text-gray-500">You've used 40% of your data</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">2 days ago</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Package className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">New Plan Available</p>
                      <p className="text-sm text-gray-500">Check out our new unlimited plan</p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">5 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </div>
  );
}