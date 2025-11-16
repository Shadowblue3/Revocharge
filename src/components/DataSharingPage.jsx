import React, { useState, useEffect } from 'react';
import { Share2, Database, Users, Zap, Wifi, TrendingUp, CheckCircle, AlertCircle, Loader, ArrowRight, Sparkles, Gift } from 'lucide-react';
import Navbar from './Navbar';
// Mock Navbar component


export default function DataSharingPage() {
  const [availableData, setAvailableData] = useState(0); // MB fetched from backend
  const [initialMB, setInitialMB] = useState(0); // Baseline MB for progress bar
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState('');
  const [showLoader, setShowLoader] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [floatingParticles, setFloatingParticles] = useState([]);
  const [sharedHistory, setSharedHistory] = useState([
    { amount: 500, date: '2 days ago', recipient: 'User #1234' },
    { amount: 300, date: '5 days ago', recipient: 'User #5678' }
  ]);

  useEffect(() => {
    const particles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 15,
      size: 20 + Math.random() * 40
    }));
    setFloatingParticles(particles);

    // fetch initial available data from latest plan
    const email = localStorage.getItem('userEmail');
    if (!email) return;
    fetch(`http://localhost:3000/api/user/${email}`)
      .then(r => r.ok ? r.json() : null)
      .then(user => {
        if (!user) return;
        const latest = user.totalPlans?.[user.totalPlans.length - 1];
        if (!latest) return;
        // Parse numeric value and unit from latest.data, eg: "3 GB" or "2500 MB"
        if (typeof latest.data === 'number') {
          // Assume numeric already represents MB
          setAvailableData(latest.data);
          setInitialMB(latest.data);
          return;
        }
        if (typeof latest.data === 'string') {
          const s = latest.data.trim();
          // Robust detection: find first number and unit anywhere in the string
          const numMatch = s.match(/\d+(?:\.\d+)?/);
          const unitMatch = s.match(/gb|mb/i);
          if (numMatch) {
            const value = parseFloat(numMatch[0]);
            const unit = unitMatch ? unitMatch[0].toUpperCase() : 'MB';
            const mb = unit === 'GB' ? Math.round(value * 1024) : Math.round(value);
            setAvailableData(mb);
            setInitialMB(mb);
            return;
          }
          setAvailableData(0);
          setInitialMB(0);
        }
      })
      .catch(() => {});
  }, []);

  const shareAmounts = [100, 200, 300, 400, 500, 600, 700, 800];

  const handleShare = async () => {
    const amount = parseInt(selectedAmount);
    if (!amount) return;
    if (amount > availableData) {
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
      return;
    }

    setShowShareDialog(false);
    setShowLoader(true);

    try {
      const email = localStorage.getItem('userEmail');
      const res = await fetch('http://localhost:3000/api/share-data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, amountMB: amount })
      });
      if (!res.ok) throw new Error('share failed');
      const data = await res.json();

      setAvailableData(data.remainingMB);
      setSharedHistory(prev => [
        { amount, date: 'Just now', recipient: 'User #' + Math.floor(Math.random() * 10000) },
        ...prev
      ]);
      setShowLoader(false);
      setShowSuccess(true);
      setSelectedAmount('');
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (e) {
      setShowLoader(false);
      setShowError(true);
      setTimeout(() => setShowError(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      
      {/* Animated Background Particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingParticles.map((particle) => (
          <div
            key={particle.id}
            className="absolute animate-float-particle"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          >
            <div className="w-full h-full rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-20 blur-xl"></div>
          </div>
        ))}
      </div>

      {/* Animated Grid Pattern */}
              <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-orange-800" 
             style={{
               backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 50px, rgba(255,255,255,0.5) 50px, rgba(255,255,255,0.5) 51px)',
               animation: 'grid-slide 20s linear infinite'
             }}
        ></div>
      </div>

      <Navbar />

      {/* Header Section */}
      <div className="relative z-10 pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-block mb-4 animate-bounce-slow">
            <span className="px-6 py-3 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-full text-sm font-semibold shadow-lg border-2 border-orange-500">
              ✨ Share Your Data, Spread the Joy
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-title-wave">
            Data
            <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent animate-gradient">
              Sharing Hub
            </span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Share your unused data with friends and family. Because sharing is caring! 💝
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-7xl mx-auto">
          
          {/* Available Data Card */}
          <div className="mb-12 animate-scale-in">
            <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative group hover:shadow-orange-300 transition-all duration-500 border border-orange-200">
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white opacity-50 animate-gradient-shift"></div>
              
              {/* Pulse Ring Effect */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-64 h-64 rounded-full border-4 border-orange-400 opacity-20 animate-pulse-ring"></div>
                <div className="w-48 h-48 rounded-full border-4 border-orange-500 opacity-20 animate-pulse-ring-delayed absolute"></div>
              </div>

              <div className="relative z-10 p-12 text-center">
                <div className="mb-8 inline-block animate-float-icon">
                  <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center shadow-2xl relative">
                    <Database className="w-16 h-16 text-white animate-pulse-glow" />
                    <div className="absolute inset-0 rounded-full border-4 border-orange-300 opacity-30 animate-ping"></div>
                  </div>
                </div>
                
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Your Available Data</h2>
                
                <div className="mb-8">
                  <div className="text-7xl font-bold bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700 bg-clip-text text-transparent animate-number-pulse">
                    {availableData}
                  </div>
                  <div className="text-2xl text-gray-600 font-semibold mt-2">MB</div>
                </div>

                {/* Progress Bar */}
                <div className="max-w-md mx-auto mb-8">
                  <div className="h-6 bg-gray-200 rounded-full overflow-hidden relative">
                    <div 
                      className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-full transition-all duration-1000 ease-out relative animate-shimmer"
                      style={{ width: `${initialMB ? Math.max(0, Math.min(100, (availableData / initialMB) * 100)) : 0}%` }}
                    >
                      <div className="absolute inset-0 bg-white opacity-30 animate-shimmer-slide"></div>
                    </div>
                  </div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>0 MB</span>
                    <span>{initialMB} MB</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowShareDialog(true)}
                  className="group relative px-12 py-5 bg-gradient-to-r from-orange-600 via-orange-600 to-orange-700 text-white text-xl font-bold rounded-2xl hover:shadow-2xl hover:scale-110 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-700 via-orange-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 animate-shimmer-slide"></div>
                  <div className="relative flex items-center space-x-3">
                    <Share2 className="w-7 h-7 animate-bounce-slow" />
                    <span>Share Data Now</span>
                    <Sparkles className="w-6 h-6 animate-spin-slow" />
                  </div>
                </button>
              </div>

              {/* Decorative Elements */}
              <div className="absolute top-4 left-4 w-20 h-20 bg-orange-400 rounded-full opacity-20 blur-2xl animate-blob"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-orange-500 rounded-full opacity-20 blur-2xl animate-blob-delayed"></div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {[
              { icon: <Gift className="w-10 h-10" />, title: 'Help Others', desc: 'Share joy with friends', color: 'from-orange-500 to-orange-600' },
              { icon: <Zap className="w-10 h-10" />, title: 'Instant Transfer', desc: 'Lightning fast sharing', color: 'from-orange-600 to-orange-700' },
              { icon: <TrendingUp className="w-10 h-10" />, title: 'Earn Rewards', desc: 'Get bonus points', color: 'from-orange-500 to-orange-700' }
            ].map((benefit, index) => (
              <div 
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up group border border-orange-100"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className={`w-20 h-20 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 shadow-xl`}>
                  {benefit.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.desc}</p>
              </div>
            ))}
          </div>

          {/* Sharing History */}
          <div className="bg-white rounded-3xl shadow-xl p-8 animate-fade-in-up border border-orange-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-6 flex items-center">
              <Users className="w-8 h-8 mr-3 text-orange-600" />
              Sharing History
            </h3>
            <div className="space-y-4">
              {sharedHistory.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center justify-between p-6 bg-gradient-to-r from-orange-50 to-orange-100/50 rounded-xl hover:shadow-md transition-all hover:scale-102 border border-orange-200"
                >
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-orange-700 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">{item.amount} MB Shared</div>
                      <div className="text-sm text-gray-600">to {item.recipient}</div>
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">{item.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Share Dialog */}
      {showShareDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 px-4 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-scale-bounce relative overflow-hidden">
            
            {/* Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-100 via-orange-50 to-white opacity-50 animate-gradient-shift"></div>
            
            <div className="relative z-10">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-600 to-orange-800 rounded-full flex items-center justify-center animate-bounce-slow">
                  <Share2 className="w-10 h-10 text-white" />
                </div>
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">Share Your Data</h3>
              <p className="text-gray-600 mb-6 text-center">Select the amount of data you want to share</p>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-3">Select Amount</label>
                <select
                  value={selectedAmount}
                  onChange={(e) => setSelectedAmount(e.target.value)}
                  className="w-full px-6 py-4 border-2 border-orange-200 rounded-xl focus:outline-none focus:border-orange-500 text-lg font-semibold bg-white hover:border-orange-300 transition-all"
                >
                  <option value="">Choose amount...</option>
                  {shareAmounts.map(amount => (
                    <option key={amount} value={amount}>{amount} MB</option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setShowShareDialog(false);
                    setSelectedAmount('');
                  }}
                  className="flex-1 px-6 py-4 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={handleShare}
                  className="flex-1 px-6 py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all hover:scale-105 flex items-center justify-center space-x-2"
                >
                  <span>Share</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Loader Dialog */}
      {showLoader && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fade-in backdrop-blur-md">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl text-center animate-scale-bounce relative overflow-hidden border border-orange-200">
            
            {/* Animated Background Waves */}
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute w-full h-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-10 animate-wave"></div>
              <div className="absolute w-full h-full bg-gradient-to-br from-orange-500 to-orange-700 opacity-10 animate-wave-delayed"></div>
            </div>

            <div className="relative z-10">
              {/* Animated Loader Icon */}
              <div className="mb-8 flex justify-center">
                <div className="relative">
                  <div className="w-32 h-32 border-8 border-orange-200 rounded-full"></div>
                  <div className="absolute inset-0 w-32 h-32 border-8 border-transparent border-t-orange-600 border-r-orange-600 rounded-full animate-spin"></div>
                  <div className="absolute inset-4 w-24 h-24 border-8 border-transparent border-t-orange-700 border-r-orange-700 rounded-full animate-spin-reverse"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Database className="w-12 h-12 text-orange-600 animate-pulse-glow" />
                  </div>
                </div>
              </div>
              
              {/* Animated Dots */}
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Sharing Data
                <span className="inline-flex ml-1">
                  <span className="animate-bounce-dot" style={{ animationDelay: '0s' }}>.</span>
                  <span className="animate-bounce-dot" style={{ animationDelay: '0.2s' }}>.</span>
                  <span className="animate-bounce-dot" style={{ animationDelay: '0.4s' }}>.</span>
                </span>
              </h3>
              
              <p className="text-gray-600 mb-6">Please wait while we transfer your data</p>
              
              {/* Progress Bar */}
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-orange-500 via-orange-600 to-orange-700 rounded-full animate-progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Success Dialog */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl text-center animate-success-bounce relative overflow-hidden border border-green-200">
            
            {/* Confetti Effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 rounded-full animate-confetti"
                                      style={{
                    left: `${Math.random() * 100}%`,
                    top: '-10px',
                    backgroundColor: ['#ea580c', '#f97316', '#fb923c'][Math.floor(Math.random() * 3)],
                    animationDelay: `${Math.random() * 0.5}s`,
                    animationDuration: `${2 + Math.random() * 2}s`
                  }}
                ></div>
              ))}
            </div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-success-icon shadow-xl">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Success!</h3>
              <p className="text-gray-600 text-lg">Data shared successfully! 🎉</p>
            </div>
          </div>
        </div>
      )}

      {/* Error Dialog */}
      {showError && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in backdrop-blur-sm">
          <div className="bg-white rounded-3xl p-12 max-w-md w-full shadow-2xl text-center animate-shake relative overflow-hidden border border-red-200">
            
            <div className="absolute inset-0 bg-red-50 opacity-50"></div>

            <div className="relative z-10">
              <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-red-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-error-icon shadow-xl">
                <AlertCircle className="w-12 h-12 text-white" />
              </div>
              
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h3>
              <p className="text-gray-600 text-lg">Not enough data available to share</p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes float-particle {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(100px, -100px) scale(1.2); }
          50% { transform: translate(-50px, -200px) scale(0.8); }
          75% { transform: translate(-100px, -100px) scale(1.1); }
        }
        @keyframes grid-slide {
          0% { transform: translateY(0); }
          100% { transform: translateY(51px); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes title-wave {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-ring {
          0% { transform: scale(0.8); opacity: 0.5; }
          50% { transform: scale(1); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.5; }
        }
        @keyframes pulse-ring-delayed {
          0% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(0.8); opacity: 0.5; }
          100% { transform: scale(1); opacity: 0.3; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; filter: drop-shadow(0 0 10px currentColor); }
          50% { opacity: 0.7; filter: drop-shadow(0 0 20px currentColor); }
        }
        @keyframes number-pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }
        @keyframes shimmer-slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        @keyframes blob-delayed {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, -30px) scale(0.9); }
          66% { transform: translate(20px, 40px) scale(1.1); }
        }
        @keyframes gradient-shift {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.1); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes float-icon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-bounce {
          0% { opacity: 0; transform: scale(0.3); }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.95); }
          100% { opacity: 1; transform: scale(1); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes bounce-dot {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes progress-fill {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        @keyframes wave {
          0% { transform: translateX(-100%) translateY(-100%) rotate(0deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(360deg); }
        }
        @keyframes wave-delayed {
          0% { transform: translateX(100%) translateY(-100%) rotate(0deg); }
          100% { transform: translateX(-100%) translateY(100%) rotate(-360deg); }
        }
        @keyframes success-bounce {
          0% { opacity: 0; transform: scale(0.3) rotate(-10deg); }
          50% { transform: scale(1.1) rotate(5deg); }
          70% { transform: scale(0.95) rotate(-2deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes success-icon {
          0% { transform: scale(0) rotate(-180deg); }
          60% { transform: scale(1.2) rotate(10deg); }
          100% { transform: scale(1) rotate(0deg); }
        }
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        @keyframes error-icon {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }

        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-title-wave { animation: title-wave 2s ease-in-out infinite; }
        .animate-gradient { 
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out forwards; }
        .animate-float-particle { animation: float-particle ease-in-out infinite; }
        .animate-pulse-ring { animation: pulse-ring 3s ease-in-out infinite; }
        .animate-pulse-ring-delayed { animation: pulse-ring-delayed 3s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-number-pulse { animation: number-pulse 2s ease-in-out infinite; }
        .animate-shimmer { 
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }
        .animate-shimmer-slide { animation: shimmer-slide 2s ease-in-out infinite; }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animate-blob-delayed { animation: blob-delayed 7s ease-in-out infinite; }
        .animate-gradient-shift { animation: gradient-shift 10s ease-in-out infinite; }
        .animate-float-icon { animation: float-icon 3s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
        .animate-scale-bounce { animation: scale-bounce 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-spin-reverse { animation: spin-reverse 1.5s linear infinite; }
        .animate-bounce-dot { animation: bounce-dot 1s ease-in-out infinite; }
        .animate-progress-fill { animation: progress-fill 3s ease-out forwards; }
        .animate-wave { animation: wave 15s ease-in-out infinite; }
        .animate-wave-delayed { animation: wave-delayed 20s ease-in-out infinite; }
        .animate-success-bounce { animation: success-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-success-icon { animation: success-icon 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-confetti { animation: confetti linear forwards; }
        .animate-shake { animation: shake 0.5s ease-in-out; }
        .animate-error-icon { animation: error-icon 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .hover\\:scale-102:hover { transform: scale(1.02); }
      `}</style>
    </div>
  );
}