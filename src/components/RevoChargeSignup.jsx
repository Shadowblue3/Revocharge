import React, { useState, useEffect } from 'react';
import { Zap, Mail, Phone, Lock, Eye, EyeOff, CheckCircle, AlertCircle, Smartphone } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom'

export default function RevoChargeSignup() {
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [floatingIcons, setFloatingIcons] = useState([]);

  const navigate = useNavigate()

  useEffect(() => {
    const icons = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 10 + Math.random() * 10
    }));
    setFloatingIcons(icons);
  }, []);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePhone = (phone) => {
    const re = /^[0-9]{10}$/;
    return re.test(phone.replace(/\s/g, ''));
  };

  const validatePassword = (password) => {
    return password.length >= 8;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, formData[name]);
  };

  const validateField = (name, value) => {
    let newErrors = { ...errors };

    switch (name) {
      case 'email':
        if (!value) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(value)) {
          newErrors.email = 'Please enter a valid email';
        } else {
          delete newErrors.email;
        }
        break;
      case 'phone':
        if (!value) {
          newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(value)) {
          newErrors.phone = 'Please enter a valid 10-digit phone number';
        } else {
          delete newErrors.phone;
        }
        break;
      case 'password':
        if (!value) {
          newErrors.password = 'Password is required';
        } else if (!validatePassword(value)) {
          newErrors.password = 'Password must be at least 8 characters';
        } else {
          delete newErrors.password;
        }
        if (touched.confirmPassword && formData.confirmPassword) {
          if (formData.confirmPassword !== value) {
            newErrors.confirmPassword = 'Passwords do not match';
          } else {
            delete newErrors.confirmPassword;
          }
        }
        break;
      case 'confirmPassword':
        if (!value) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (value !== formData.password) {
          newErrors.confirmPassword = 'Passwords do not match';
        } else {
          delete newErrors.confirmPassword;
        }
        break;
    }

    setErrors(newErrors);
  };

  const handleSubmit = async () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const allTouched = {
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    };
    setTouched(allTouched);

    Object.keys(formData).forEach(key => {
      validateField(key, formData[key]);
    });

    const currentErrors = {};
    if (!formData.email) currentErrors.email = 'Email is required';
    else if (!validateEmail(formData.email)) currentErrors.email = 'Please enter a valid email';

    if (!formData.phone) currentErrors.phone = 'Phone number is required';
    else if (!validatePhone(formData.phone)) currentErrors.phone = 'Please enter a valid 10-digit phone number';

    if (!formData.password) currentErrors.password = 'Password is required';
    else if (!validatePassword(formData.password)) currentErrors.password = 'Password must be at least 8 characters';

    if (!formData.confirmPassword) currentErrors.confirmPassword = 'Please confirm your password';
    else if (formData.confirmPassword !== formData.password) currentErrors.confirmPassword = 'Passwords do not match';

    if (Object.keys(currentErrors).length === 0) {
      try {
        const response = await fetch(`${backendUrl}/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });

        const data = await response.json().catch(() => ({}));

        if (response.ok) {
          alert('Signup successful! Welcome to RevoCharge 🎉');
          navigate('/login');
        } else {
          alert(data.message || 'Signup failed');
        }
      } catch (err) {
        alert('Network error. Please try again.');
      }
    } else {
      setErrors(currentErrors);
    }
  };

  const getInputClassName = (fieldName) => {
    const baseClass = "w-full pl-12 pr-4 py-3 border-2 rounded-xl focus:outline-none transition-all";
    if (touched[fieldName] && !errors[fieldName] && formData[fieldName]) {
      return `${baseClass} border-green-400 focus:border-green-500 bg-green-50 hover:border-green-400`;
    } else if (touched[fieldName] && errors[fieldName]) {
      return `${baseClass} border-red-400 focus:border-red-500 bg-red-50 hover:border-red-400`;
    }
    return `${baseClass} border-gray-200 focus:border-orange-500 hover:border-orange-300`;
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

      {/* Signup Card */}
      <div className="relative z-10 w-full max-w-md animate-fade-in-up">
        <div className="bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-orange-100">
          {/* Logo with Animation */}
          <div className="flex justify-center mb-6">
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
            <h2 className="text-3xl font-bold text-gray-900 mb-2">Create Account</h2>
            <p className="text-gray-600">Join thousands of happy rechargers</p>
          </div>

          {/* Signup Form */}
          <div className="space-y-5">
            {/* Email Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={() => handleBlur('email')}
                  className={getInputClassName('email')}
                  placeholder="you@example.com"
                />
                {touched.email && !errors.email && formData.email && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
                {touched.email && errors.email && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                )}
              </div>
              {touched.email && errors.email && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onBlur={() => handleBlur('phone')}
                  className={getInputClassName('phone')}
                  placeholder="9876543210"
                  maxLength="10"
                />
                {touched.phone && !errors.phone && formData.phone && (
                  <CheckCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-green-500 w-5 h-5" />
                )}
                {touched.phone && errors.phone && (
                  <AlertCircle className="absolute right-4 top-1/2 transform -translate-y-1/2 text-red-500 w-5 h-5" />
                )}
              </div>
              {touched.phone && errors.phone && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  onBlur={() => handleBlur('password')}
                  className={getInputClassName('password')}
                  placeholder="Min. 8 characters"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.password && errors.password && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Confirm Password
              </label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  onBlur={() => handleBlur('confirmPassword')}
                  className={getInputClassName('confirmPassword')}
                  placeholder="Re-enter password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-orange-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {touched.confirmPassword && errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-500 flex items-center">
                  <AlertCircle className="w-3 h-3 mr-1" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-xl animate-fade-in-up relative overflow-hidden group mt-6"
              style={{ animationDelay: '0.5s' }}
            >
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="flex-1 border-t border-gray-200"></div>
            <span className="px-4 text-sm text-gray-500">OR</span>
            <div className="flex-1 border-t border-gray-200"></div>
          </div>

          {/* Login Link */}
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.7s' }}>
            <p className="text-gray-600">
              Already have an account?{' '}

              <Link to={"/login"}>
                <button className="text-orange-600 hover:text-orange-700 font-semibold transition-colors hover:underline cursor-pointer">
                  Login
                </button>
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="mt-6 grid grid-cols-3 gap-3 animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100 shadow-md">
            <div className="text-2xl mb-1">⚡</div>
            <div className="text-xs text-gray-600 font-medium">Instant Recharge</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100 shadow-md">
            <div className="text-2xl mb-1">💰</div>
            <div className="text-xs text-gray-600 font-medium">Cashback Offers</div>
          </div>
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-3 text-center border border-orange-100 shadow-md">
            <div className="text-2xl mb-1">🔒</div>
            <div className="text-xs text-gray-600 font-medium">Secure & Safe</div>
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