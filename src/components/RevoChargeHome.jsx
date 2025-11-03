import React, { useState, useEffect } from 'react';
import { Zap, Menu, X, User, LogOut, Smartphone, Share2, CreditCard, Gift, Star, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin, Send, CheckCircle, TrendingUp, Users, Clock, Sparkles } from 'lucide-react';
import Navbar from './Navbar';

export default function RevoChargeHome() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFeature, setActiveFeature] = useState(0);
  const [particles, setParticles] = useState([]);
  const [floatingIcons, setFloatingIcons] = useState([]);
  const [rechargeCount, setRechargeCount] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const particleInterval = setInterval(() => {
      setParticles(prev => [
        ...prev,
        {
          id: Date.now(),
          x: Math.random() * 100,
          y: 100,
          size: Math.random() * 4 + 2,
          duration: Math.random() * 3 + 2
        }
      ].slice(-20));
    }, 200);
    return () => clearInterval(particleInterval);
  }, []);

  useEffect(() => {
    const icons = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 15 + Math.random() * 10
    }));
    setFloatingIcons(icons);
  }, []);

  useEffect(() => {
    const counter = setInterval(() => {
      setRechargeCount(prev => (prev < 50247 ? prev + 127 : 50247));
    }, 50);
    return () => clearInterval(counter);
  }, []);

  const handleContactSubmit = () => {
    if (contactForm.name && contactForm.email && contactForm.message) {
      console.log('Contact form submitted:', contactForm);
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setContactForm({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Recharge",
      description: "Lightning-fast mobile recharges completed in seconds with 99.9% success rate",
      color: "from-orange-400 to-orange-600",
      gradient: "orange"
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Data Sharing",
      description: "Share data with family and friends instantly. Split your plans seamlessly",
      color: "from-blue-400 to-blue-600",
      gradient: "blue"
    },
    {
      icon: <CreditCard className="w-8 h-8" />,
      title: "Credit System",
      description: "Earn credits on every recharge. Redeem for discounts and exclusive offers",
      color: "from-purple-400 to-purple-600",
      gradient: "purple"
    },
    {
      icon: <Gift className="w-8 h-8" />,
      title: "Cashback Rewards",
      description: "Get instant cashback on every transaction. Up to 10% on prepaid recharges",
      color: "from-green-400 to-green-600",
      gradient: "green"
    }
  ];

  const reviews = [
    {
      name: "Priya Sharma",
      rating: 5,
      review: "RevoCharge has made my life so much easier! The instant recharge feature is amazing and I love the cashback rewards.",
      avatar: "PS",
      location: "Mumbai"
    },
    {
      name: "Rahul Verma",
      rating: 5,
      review: "Best recharge platform I've used. The data sharing feature is perfect for my family plan. Highly recommended!",
      avatar: "RV",
      location: "Delhi"
    },
    {
      name: "Anjali Reddy",
      rating: 5,
      review: "The credit system is brilliant! I've saved so much money using my earned credits. Customer support is excellent too.",
      avatar: "AR",
      location: "Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50 overflow-hidden">
      {/* Navbar */}
      <Navbar/>

      {/* Hero Section - About RevoCharge */}
      <section id="home" className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-orange-300 rounded-full opacity-20 blur-3xl top-20 -left-48 animate-blob"></div>
          <div className="absolute w-96 h-96 bg-orange-400 rounded-full opacity-20 blur-3xl top-40 -right-48 animate-blob animation-delay-2000"></div>
          <div className="absolute w-64 h-64 bg-orange-500 rounded-full opacity-10 blur-2xl bottom-20 left-1/2 animate-blob animation-delay-4000"></div>
          
          {/* Floating Icons */}
          {floatingIcons.map((icon) => (
            <div
              key={icon.id}
              className="absolute animate-float-complex opacity-5"
              style={{
                left: `${icon.left}%`,
                top: `${icon.top}%`,
                animationDelay: `${icon.delay}s`,
                animationDuration: `${icon.duration}s`
              }}
            >
              {icon.id % 4 === 0 ? (
                <Smartphone className="w-12 h-12 text-orange-600" />
              ) : icon.id % 4 === 1 ? (
                <Zap className="w-12 h-12 text-orange-600" />
              ) : icon.id % 4 === 2 ? (
                <Share2 className="w-12 h-12 text-orange-600" />
              ) : (
                <Gift className="w-12 h-12 text-orange-600" />
              )}
            </div>
          ))}

          {/* Rising Particles */}
          {particles.map((particle) => (
            <div
              key={particle.id}
              className="absolute rounded-full bg-orange-400 animate-rise-up"
              style={{
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                animationDuration: `${particle.duration}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-12 animate-fade-in-up">
            <div className="inline-block mb-4 animate-bounce-subtle">
              <span className="px-6 py-3 bg-gradient-to-r from-orange-100 to-orange-200 text-orange-700 rounded-full text-sm font-semibold shadow-lg animate-shimmer">
                ⚡ Welcome to the Future of Recharging
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 animate-text-glow">
              Revolutionizing Mobile
              <span className="block bg-gradient-to-r from-orange-600 via-orange-500 to-orange-800 bg-clip-text text-transparent animate-gradient-x">
                Recharge Experience
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animation-delay-200">
              RevoCharge is your trusted companion for all mobile recharge needs. We combine cutting-edge technology 
              with user-friendly design to deliver instant recharges, exclusive rewards, and innovative features like 
              data sharing and credit systems. Join over 50,000+ satisfied users who have already made the switch.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up group relative overflow-hidden" style={{ animationDelay: '0.1s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-orange-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center mb-4 animate-bounce-rotate group-hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text mb-2 animate-count-up">{rechargeCount.toLocaleString()}+</h3>
              <p className="text-gray-600 font-medium">Active Users</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up group relative overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center mb-4 animate-bounce-rotate group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-green-600 to-green-800 bg-clip-text mb-2">99.9%</h3>
              <p className="text-gray-600 font-medium">Success Rate</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-green-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-4 hover:scale-105 animate-fade-in-up group relative overflow-hidden" style={{ animationDelay: '0.3s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 opacity-0 group-hover:opacity-10 transition-opacity"></div>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl flex items-center justify-center mb-4 animate-bounce-rotate group-hover:scale-110 transition-transform">
                <Zap className="w-8 h-8 text-white animate-electric-pulse" />
              </div>
              <h3 className="text-3xl font-bold text-transparent bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text mb-2">&lt;3 Sec</h3>
              <p className="text-gray-600 font-medium">Avg Recharge Time</p>
              <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full blur-2xl opacity-50 animate-pulse"></div>
            </div>
          </div>

          {/* Animated Live Counter */}
          <div className="mt-16 text-center animate-fade-in-up animation-delay-400">
            <div className="inline-block bg-gradient-to-r from-orange-500 to-orange-700 text-white px-8 py-4 rounded-2xl shadow-2xl animate-pulse-glow">
              <div className="flex items-center space-x-3">
                <TrendingUp className="w-6 h-6 animate-bounce" />
                <span className="text-lg font-semibold">Live: <span className="animate-count-up">{Math.floor(Math.random() * 100) + 50}</span> recharges happening now!</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-orange-50 relative overflow-hidden">
        {/* Animated Grid Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(to right, #f97316 1px, transparent 1px), linear-gradient(to bottom, #f97316 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <Sparkles className="w-12 h-12 text-orange-600 mx-auto animate-spin-slow" />
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-text-glow">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need for a seamless recharge experience
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-3 cursor-pointer group relative overflow-hidden ${
                  activeFeature === index ? 'ring-4 ring-orange-400 scale-105' : ''
                }`}
                style={{ 
                  animationDelay: `${index * 0.1}s`,
                  animation: 'float-up-down 3s ease-in-out infinite',
                  animationDelay: `${index * 0.5}s`,
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-12px)`;
                }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = e.clientX - rect.left - rect.width / 2;
                  const y = e.clientY - rect.top - rect.height / 2;
                  e.currentTarget.style.transform = `perspective(1000px) rotateY(${x / 20}deg) rotateX(${-y / 20}deg) translateY(-12px)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)';
                }}
              >
                {/* Animated Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-all duration-500`}></div>

                <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 text-white transform transition-all group-hover:scale-125 group-hover:rotate-12 animate-bounce-rotate relative`}>
                  {feature.icon}
                  <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} rounded-2xl blur-xl opacity-50 animate-pulse`}></div>
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                
                {/* Corner Decoration */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-orange-200 rounded-full blur-2xl opacity-0 group-hover:opacity-50 transition-opacity"></div>
              </div>
            ))}
          </div>

          {/* Animated Stats Bar */}
          <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Users />, label: "Happy Users", value: "50K+" },
              { icon: <Clock />, label: "Avg Speed", value: "2.5s" },
              { icon: <Gift />, label: "Rewards Given", value: "₹2Cr+" },
              { icon: <TrendingUp />, label: "Growth", value: "300%" }
            ].map((stat, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-sm rounded-xl p-4 text-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110 animate-fade-in-up" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-orange-600 mb-2 flex justify-center animate-bounce-subtle">
                  {stat.icon}
                </div>
                <div className="text-2xl font-bold text-gray-900 animate-count-up">{stat.value}</div>
                <div className="text-xs text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-16 px-4 sm:px-6 lg:px-8 bg-white relative overflow-hidden">
        {/* Floating Stars Background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <Star
              key={i}
              className="absolute text-yellow-300 animate-twinkle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 20 + 10}px`,
                height: `${Math.random() * 20 + 10}px`,
                animationDelay: `${Math.random() * 3}s`,
                opacity: 0.1
              }}
              fill="currentColor"
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-8 h-8 text-yellow-400 fill-current animate-star-pop" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-text-glow">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Real experiences from real people
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-all transform hover:-translate-y-6 hover:rotate-1 group relative overflow-hidden animate-fade-in-up"
                style={{ 
                  animationDelay: `${index * 0.2}s`,
                  animation: 'float-up-down 4s ease-in-out infinite',
                  animationDelay: `${index * 0.7}s`
                }}
              >
                {/* Quote Mark Animation */}
                <div className="absolute top-4 right-4 text-6xl text-orange-200 opacity-50 group-hover:scale-150 group-hover:rotate-12 transition-all">"</div>
                
                <div className="flex items-center mb-4 relative z-10">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4 animate-bounce-rotate group-hover:scale-110 transition-transform shadow-lg">
                    {review.avatar}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{review.name}</h4>
                    <p className="text-sm text-gray-500 flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      {review.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current animate-star-pop" style={{ animationDelay: `${i * 0.1}s` }} />
                  ))}
                </div>
                
                <p className="text-gray-700 leading-relaxed italic relative z-10">"{review.review}"</p>
                
                {/* Glow Effect */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
              </div>
            ))}
          </div>

          {/* Animated Rating Banner */}
          <div className="mt-16 text-center animate-fade-in-up animation-delay-600">
            <div className="inline-block bg-gradient-to-r from-yellow-400 via-orange-400 to-orange-500 text-white px-12 py-6 rounded-3xl shadow-2xl animate-pulse-glow">
              <div className="flex items-center space-x-4">
                <div className="text-5xl font-bold animate-count-up">4.9</div>
                <div className="text-left">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-6 h-6 fill-current animate-star-pop" style={{ animationDelay: `${i * 0.1}s` }} />
                    ))}
                  </div>
                  <div className="text-sm opacity-90">Based on 10,000+ reviews</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
        {/* Animated Waves */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          <div className="absolute w-full h-32 bg-gradient-to-r from-orange-200 to-orange-300 rounded-full blur-3xl animate-wave" style={{ bottom: '60%', left: '-10%' }}></div>
          <div className="absolute w-full h-32 bg-gradient-to-r from-orange-300 to-orange-400 rounded-full blur-3xl animate-wave animation-delay-2000" style={{ bottom: '50%', left: '-5%' }}></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <Mail className="w-16 h-16 text-orange-600 mx-auto mb-4 animate-bounce-subtle" />
            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 animate-text-glow">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600">
              We're here to help with any questions or concerns
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-8">
              {[
                { icon: <Mail className="w-6 h-6 text-white" />, title: "Email Us", info: ["support@revocharge.com", "help@revocharge.com"], color: "from-orange-400 to-orange-600" },
                { icon: <Phone className="w-6 h-6 text-white" />, title: "Call Us", info: ["+91 1800-123-4567", "24/7 Support Available"], color: "from-blue-400 to-blue-600" },
                { icon: <MapPin className="w-6 h-6 text-white" />, title: "Visit Us", info: ["123 Tech Park, Cyber City", "Bangalore, Karnataka 560001"], color: "from-purple-400 to-purple-600" }
              ].map((contact, i) => (
                <div key={i} className="flex items-start space-x-4 animate-fade-in-slide-right group" style={{ animationDelay: `${i * 0.2}s` }}>
                  <div className={`w-14 h-14 bg-gradient-to-br ${contact.color} rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all animate-bounce-subtle`}>
                    {contact.icon}
                    <div className={`absolute inset-0 bg-gradient-to-br ${contact.color} rounded-xl blur-xl opacity-50 animate-pulse`}></div>
                  </div>
                  <div className="group-hover:translate-x-2 transition-transform">
                    <h3 className="font-bold text-gray-900 mb-1 text-lg">{contact.title}</h3>
                    {contact.info.map((line, j) => (
                      <p key={j} className="text-gray-600">{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105 relative overflow-hidden group">
              {/* Animated Border */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-orange-400 via-orange-500 to-orange-600 opacity-0 group-hover:opacity-100 animate-border-spin"></div>
              <div className="absolute inset-[2px] rounded-3xl bg-white"></div>
              
              <div className="relative z-10">
                {formSubmitted ? (
                  <div className="flex flex-col items-center justify-center h-full text-center py-12 animate-success-pop">
                    <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6 animate-bounce-rotate">
                      <CheckCircle className="w-12 h-12 text-green-600 animate-check-mark" />
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-3 animate-text-glow">Message Sent!</h3>
                    <p className="text-gray-600 text-lg">We'll get back to you soon.</p>
                    <div className="mt-6">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="inline-block w-2 h-2 bg-green-500 rounded-full mx-1 animate-bounce" style={{ animationDelay: `${i * 0.1}s` }}></div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={contactForm.name}
                        onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all hover:border-orange-300 hover:shadow-lg"
                        placeholder="John Doe"
                      />
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all hover:border-orange-300 hover:shadow-lg"
                        placeholder="john@example.com"
                      />
                    </div>

                    <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Message
                      </label>
                      <textarea
                        value={contactForm.message}
                        onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                        rows="4"
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none transition-all resize-none hover:border-orange-300 hover:shadow-lg"
                        placeholder="How can we help you?"
                      ></textarea>
                    </div>

                    <button
                      onClick={handleContactSubmit}
                      className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center space-x-2 group animate-fade-in-up relative overflow-hidden"
                      style={{ animationDelay: '0.4s' }}
                    >
                      <span className="relative z-10">Send Message</span>
                      <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform relative z-10" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-orange-500 animate-float-slow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 10 + 10}s`
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div className="animate-fade-in-up">
              <div className="flex items-center space-x-2 mb-4">
                <div className="relative">
                  <Zap className="w-8 h-8 text-orange-500 animate-electric-pulse" fill="currentColor" />
                  <div className="absolute inset-0 animate-ping opacity-30">
                    <Zap className="w-8 h-8 text-orange-500" fill="currentColor" />
                  </div>
                </div>
                <span className="text-2xl font-bold animate-gradient-x bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">RevoCharge</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your trusted partner for instant mobile recharges and exclusive rewards.
              </p>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Quick Links</h3>
              <ul className="space-y-2">
                {['Home', 'Features', 'Reviews', 'Contact'].map((link, i) => (
                  <li key={i}>
                    <a href={`#${link.toLowerCase()}`} className="text-gray-400 hover:text-orange-500 transition-all hover:translate-x-2 inline-block transform">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Services</h3>
              <ul className="space-y-2">
                {['Mobile Recharge', 'Data Sharing', 'Credit System', 'Cashback Rewards'].map((service, i) => (
                  <li key={i}>
                    <span className="text-gray-400 hover:text-orange-500 transition-colors cursor-pointer">{service}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <h3 className="font-bold text-lg mb-4 text-orange-400">Follow Us</h3>
              <div className="flex space-x-4 mb-4">
                {[
                  { icon: <Facebook className="w-5 h-5" />, color: "from-blue-500 to-blue-700" },
                  { icon: <Twitter className="w-5 h-5" />, color: "from-sky-400 to-sky-600" },
                  { icon: <Instagram className="w-5 h-5" />, color: "from-pink-500 to-purple-600" },
                  { icon: <Linkedin className="w-5 h-5" />, color: "from-blue-600 to-blue-800" }
                ].map((social, i) => (
                  <button
                    key={i}
                    className={`w-11 h-11 bg-gradient-to-br ${social.color} rounded-full flex items-center justify-center transition-all transform hover:scale-125 hover:-translate-y-2 shadow-lg hover:shadow-2xl animate-bounce-subtle relative group`}
                    style={{ animationDelay: `${i * 0.1}s` }}
                  >
                    {social.icon}
                    <div className={`absolute inset-0 bg-gradient-to-br ${social.color} rounded-full blur-lg opacity-0 group-hover:opacity-70 transition-opacity animate-pulse`}></div>
                  </button>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Stay connected for updates and exclusive offers!
              </p>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
                <span className="animate-pulse mr-2">💙</span>
                © 2025 RevoCharge. All rights reserved.
              </p>
              <div className="flex space-x-6 text-sm">
                {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((policy, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-orange-500 transition-all hover:scale-110 transform inline-block">
                    {policy}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Animated Divider */}
          <div className="mt-8 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent animate-shimmer"></div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes fade-in-slide-right {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes bounce-rotate {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -20px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(20px, 20px) scale(1.05); }
        }
        @keyframes float-complex {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(30px, -30px) rotate(90deg); }
          50% { transform: translate(-20px, -50px) rotate(180deg); }
          75% { transform: translate(-30px, -20px) rotate(270deg); }
        }
        @keyframes rise-up {
          0% { transform: translateY(0) scale(1); opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0); opacity: 0; }
        }
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        @keyframes text-glow {
          0%, 100% { text-shadow: 0 0 10px rgba(249, 115, 22, 0.5); }
          50% { text-shadow: 0 0 20px rgba(249, 115, 22, 0.8), 0 0 30px rgba(249, 115, 22, 0.6); }
        }
        @keyframes electric-pulse {
          0%, 100% { filter: drop-shadow(0 0 5px #f97316); }
          50% { filter: drop-shadow(0 0 15px #f97316) drop-shadow(0 0 25px #f97316); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 20px rgba(249, 115, 22, 0.5); }
          50% { box-shadow: 0 0 40px rgba(249, 115, 22, 0.8), 0 0 60px rgba(249, 115, 22, 0.6); }
        }
        @keyframes float-up-down {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes star-pop {
          0% { transform: scale(0) rotate(0deg); }
          50% { transform: scale(1.2) rotate(180deg); }
          100% { transform: scale(1) rotate(360deg); }
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.1; transform: scale(1); }
          50% { opacity: 0.3; transform: scale(1.5); }
        }
        @keyframes wave {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-30px); }
        }
        @keyframes border-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes success-pop {
          0% { transform: scale(0); opacity: 0; }
          50% { transform: scale(1.1); }
          100% { transform: scale(1); opacity: 1; }
        }
        @keyframes check-mark {
          0% { transform: scale(0); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(10px, -10px); }
          50% { transform: translate(-10px, -20px); }
          75% { transform: translate(-10px, -10px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes count-up {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-down {
          from { transform: translateY(-100%); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }

        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out forwards; }
        .animate-fade-in-slide-right { animation: fade-in-slide-right 0.8s ease-out forwards; }
        .animate-bounce-rotate { animation: bounce-rotate 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-blob { animation: blob 7s ease-in-out infinite; }
        .animate-float-complex { animation: float-complex ease-in-out infinite; }
        .animate-rise-up { animation: rise-up linear forwards; }
        .animate-gradient-x { background-size: 200% auto; animation: gradient-x 3s ease infinite; }
        .animate-shimmer { background: linear-gradient(90deg, transparent, rgba(255,255,255,0.8), transparent); background-size: 200% 100%; animation: shimmer 2s infinite; }
        .animate-text-glow { animation: text-glow 2s ease-in-out infinite; }
        .animate-electric-pulse { animation: electric-pulse 1.5s ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-star-pop { animation: star-pop 0.6s ease-out forwards; }
        .animate-twinkle { animation: twinkle 3s ease-in-out infinite; }
        .animate-wave { animation: wave 5s ease-in-out infinite; }
        .animate-border-spin { animation: border-spin 3s linear infinite; }
        .animate-success-pop { animation: success-pop 0.5s ease-out forwards; }
        .animate-check-mark { animation: check-mark 0.5s ease-out 0.2s forwards; }
        .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
        .animate-count-up { animation: count-up 0.5s ease-out forwards; }
        .animate-slide-down { animation: slide-down 0.3s ease-out forwards; }

        .animation-delay-200 { animation-delay: 0.2s; }
        .animation-delay-400 { animation-delay: 0.4s; }
        .animation-delay-600 { animation-delay: 0.6s; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-4000 { animation-delay: 4s; }
      `}</style>
    </div>
  );
}