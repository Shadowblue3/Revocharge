import React, { useState, useEffect } from 'react';
import { Zap, Mail, Lock, Eye, EyeOff, Smartphone } from 'lucide-react';
import { Link, useNavigate} from 'react-router-dom';





export default function LoginPage() {
  const navigate = useNavigate()

  const [showPassword, setShowPassword] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: ''
  });
  const [floatingIcons, setFloatingIcons] = useState([]);

  useEffect(() => {
    // Generate random floating icons

    const icons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setFloatingIcons(icons);
  }, []);

  const handleLoginSubmit = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    // console.log('Login:', loginData);
    // alert('Login submitted! Check console for data.');

    const response = await fetch(`${backendUrl}/login`, {
      method: 'post',
      headers: {
        "Content-Type": "application/json",   // 👈 tells backend you're sending JSON
      },
      body: JSON.stringify(loginData),
    })
    if (response.ok) {
      localStorage.setItem("userEmail", loginData.email)
      alert('Signup successful! Welcome to RevoCharge 🎉');
      navigate(`/${localStorage.getItem("userEmail")}/home`);
    } else {
      alert(data.message || 'Signup failed');
    }

  };



  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute w-96 h-96 bg-gradient-to-br from-orange-300 to-orange-500 rounded-full opacity-20 blur-3xl top-0 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full opacity-20 blur-3xl bottom-0 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute w-64 h-64 bg-gradient-to-br from-orange-200 to-orange-400 rounded-full opacity-15 blur-2xl top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-pulse" style={{ animationDelay: '2s' }}></div>

        {/* Floating Icons */}
        {floatingIcons.map((icon) => (
          <div
            key={icon.id}
            className="absolute animate-float-random opacity-10"
            style={{
              left: `${icon.left}%`,
              top: `${icon.top}%`,
              animationDelay: `${icon.delay}s`,
              animationDuration: `${icon.duration}s`
            }}
          >
            {icon.id % 3 === 0 ? (
              <Smartphone className="w-8 h-8 text-orange-600" />
            ) : icon.id % 3 === 1 ? (
              <Zap className="w-8 h-8 text-orange-600" />
            ) : (
              <div className="w-6 h-6 rounded-full bg-orange-400"></div>
            )}
          </div>
        ))}

        {/* Animated Lines */}
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30 animate-slide-right"></div>
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-300 to-transparent opacity-30 animate-slide-left"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-100">
          {/* Logo with Animation */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Zap className="w-10 h-10 text-orange-600 animate-pulse-glow" fill="currentColor" />
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="w-12 h-12 border-2 border-orange-300 border-t-transparent rounded-full"></div>
                  </div>
                </div>
                <span className="text-3xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
                  RevoCharge
                </span>
              </div>
            </div>
          </div>

          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Login to continue your recharge journey</p>
          </div>

          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  value={loginData.email}
                  onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all hover:border-orange-300"
                  placeholder="your.email@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={loginData.password}
                  onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all hover:border-orange-300"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <button className="text-sm text-orange-600 hover:text-orange-700 font-semibold transition-colors hover:underline">
                Forgot Password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleLoginSubmit}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up relative overflow-hidden group"
              style={{ animationDelay: '0.4s' }}
            >
              <span className="relative z-10">Login</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Sign Up Link */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <p className="text-gray-600">
              Don't have an account?{' '}

              <Link to={"/signup"}>
                <button className="text-orange-600 hover:text-orange-700 font-semibold transition-colors hover:underline cursor-pointer">
                  Sign Up
                </button>
              </Link>
            </p>
          </div>
        </div>
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
        @keyframes float-random {
          0%, 100% {
            transform: translate(0, 0) rotate(0deg);
          }
          25% {
            transform: translate(10px, -15px) rotate(5deg);
          }
          50% {
            transform: translate(-5px, -25px) rotate(-5deg);
          }
          75% {
            transform: translate(-15px, -10px) rotate(3deg);
          }
        }
        @keyframes slide-right {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        @keyframes slide-left {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        @keyframes pulse-glow {
          0%, 100% {
            opacity: 1;
            filter: drop-shadow(0 0 8px rgba(249, 115, 22, 0.5));
          }
          50% {
            opacity: 0.8;
            filter: drop-shadow(0 0 12px rgba(249, 115, 22, 0.8));
          }
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .animate-float-random {
          animation: float-random ease-in-out infinite;
        }
        .animate-slide-right {
          animation: slide-right 8s linear infinite;
        }
        .animate-slide-left {
          animation: slide-left 8s linear infinite;
        }
        .animate-pulse-glow {
          animation: pulse-glow 2s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
}