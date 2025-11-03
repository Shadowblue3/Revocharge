import React, { useState } from 'react';
import { Check, CreditCard, ArrowLeft, Shield, Zap, Clock, Phone, Database, Radio, Package, ChevronRight, X } from 'lucide-react';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';

// Mock Navbar component


export default function PurchasePage() {
  const navigate = useNavigate()

  const [showPayment, setShowPayment] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState('card');
  const [showCardDialog, setShowCardDialog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: ''
  });
  const [cardErrors, setCardErrors] = useState({});

  // Sample plan data
  const plan = {
    name: "Ultra 5G",
    price: 599,
    validity: "84 days",
    data: "2GB/day",
    calls: "Unlimited",
    sms: "100/day",
    extras: ["5G Unlimited", "Disney+ Hotstar", "Prime Video Mobile", "High Speed Data"]
  };

  const handleProceedToPayment = () => {
    setShowPayment(true);
  };

  const validateCardDetails = () => {
    const errors = {};
    
    // Validate card number (16 digits)
    if (cardData.number.replace(/\s/g, '').length !== 16) {
      errors.number = 'Card number must be 16 digits';
    }
    
    // Validate expiry date (MM/YY format and valid date)
    const expiryRegex = /^(0[1-9]|1[0-2])\/([0-9]{2})$/;
    if (!expiryRegex.test(cardData.expiry)) {
      errors.expiry = 'Invalid expiry date (use MM/YY)';
    } else {
      const [month, year] = cardData.expiry.split('/');
      const currentDate = new Date();
      const currentYear = currentDate.getFullYear() % 100;
      const currentMonth = currentDate.getMonth() + 1;
      
      if (parseInt(year) < currentYear || (parseInt(year) === currentYear && parseInt(month) < currentMonth)) {
        errors.expiry = 'Card has expired';
      }
    }
    
    // Validate CVV (3 digits)
    if (!/^\d{3}$/.test(cardData.cvv)) {
      errors.cvv = 'CVV must be 3 digits';
    }
    
    setCardErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePayment = () => {
    if (selectedPayment === 'card') {
      setShowCardDialog(true);
    } else {
      // For UPI and Net Banking, directly process
      processPayment();
    }
  };

  const processPayment = () => {
    setProcessing(true);
    setShowCardDialog(false);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
  };

  const handleCardPayment = () => {
    if (validateCardDetails()) {
      processPayment();
    }
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || '';
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl p-12 text-center animate-scale-in">
          <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 animate-success-bounce">
            <Check className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful!</h2>
          <p className="text-gray-600 mb-8">Your recharge has been completed successfully. Enjoy your new plan!</p>
          <div className="bg-orange-50 rounded-2xl p-6 mb-6 border border-orange-200">
            <div className="text-sm text-gray-600 mb-2">Plan Activated</div>
            <div className="text-2xl font-bold text-orange-600">{plan.name}</div>
          </div>
          <button 
            onClick={() => navigate(`/${localStorage.getItem("userEmail")}/plans`)}
            className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Back to Plans
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 relative overflow-hidden">
      <Navbar />

      {/* Card Details Dialog */}
      {showCardDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 animate-scale-in relative">
            <button
              onClick={() => setShowCardDialog(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="flex items-center mb-6">
              <div className="p-3 bg-orange-100 rounded-xl mr-4">
                <CreditCard className="w-8 h-8 text-orange-600" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Card Details</h3>
                <p className="text-sm text-gray-600">Enter your card information</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Card Number */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Card Number
                </label>
                <input
                  type="text"
                  value={cardData.number}
                  onChange={(e) => {
                    const formatted = formatCardNumber(e.target.value);
                    if (formatted.replace(/\s/g, '').length <= 16) {
                      setCardData({ ...cardData, number: formatted });
                      setCardErrors({ ...cardErrors, number: '' });
                    }
                  }}
                  className={`w-full px-4 py-3 border-2 ${cardErrors.number ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-colors`}
                  placeholder="1234 5678 9012 3456"
                  maxLength="19"
                />
                {cardErrors.number && (
                  <p className="text-red-500 text-xs mt-1">{cardErrors.number}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Expiry Date */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    value={cardData.expiry}
                    onChange={(e) => {
                      const formatted = formatExpiry(e.target.value);
                      if (formatted.length <= 5) {
                        setCardData({ ...cardData, expiry: formatted });
                        setCardErrors({ ...cardErrors, expiry: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 border-2 ${cardErrors.expiry ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-colors`}
                    placeholder="MM/YY"
                    maxLength="5"
                  />
                  {cardErrors.expiry && (
                    <p className="text-red-500 text-xs mt-1">{cardErrors.expiry}</p>
                  )}
                </div>

                {/* CVV */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    CVV
                  </label>
                  <input
                    type="text"
                    value={cardData.cvv}
                    onChange={(e) => {
                      const value = e.target.value.replace(/\D/g, '');
                      if (value.length <= 3) {
                        setCardData({ ...cardData, cvv: value });
                        setCardErrors({ ...cardErrors, cvv: '' });
                      }
                    }}
                    className={`w-full px-4 py-3 border-2 ${cardErrors.cvv ? 'border-red-500' : 'border-gray-200'} rounded-xl focus:border-orange-500 focus:outline-none transition-colors`}
                    placeholder="123"
                    maxLength="3"
                  />
                  {cardErrors.cvv && (
                    <p className="text-red-500 text-xs mt-1">{cardErrors.cvv}</p>
                  )}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={handleCardPayment}
                  className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2"
                >
                  <CreditCard className="w-5 h-5" />
                  <span>Pay ₹{plan.price + Math.round(plan.price * 0.18)}</span>
                </button>
                <button
                  onClick={() => setShowCardDialog(false)}
                  className="w-full py-3 border-2 border-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-all"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="relative z-10 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => Navigate(`/${localStorage.getItem("userEmail")}/plans`)}
            className="flex items-center text-gray-600 hover:text-orange-600 mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Plans
          </button>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Complete Your
            <span className="block bg-gradient-to-r from-orange-600 to-orange-700 bg-clip-text text-transparent">
              Purchase
            </span>
          </h1>
          <p className="text-lg text-gray-600">Review your plan details and proceed to payment</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Plan Details - Left Side */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Plan Summary Card */}
              <div className="bg-white rounded-2xl shadow-lg p-8 border border-orange-100">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="inline-block px-4 py-2 bg-orange-100 text-orange-700 rounded-full text-sm font-semibold mb-3">
                      Selected Plan
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">{plan.name}</h2>
                    <div className="flex items-baseline">
                      <span className="text-4xl font-bold text-orange-600">₹{plan.price}</span>
                      <span className="text-gray-600 ml-2">for {plan.validity}</span>
                    </div>
                  </div>
                  <Package className="w-12 h-12 text-orange-500" />
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Plan Includes:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                      <Database className="w-6 h-6 text-orange-600 mr-4 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Data</div>
                        <div className="text-gray-600">{plan.data}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                      <Phone className="w-6 h-6 text-orange-600 mr-4 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">Voice Calls</div>
                        <div className="text-gray-600">{plan.calls}</div>
                      </div>
                    </div>
                    <div className="flex items-center p-4 bg-orange-50 rounded-xl">
                      <Radio className="w-6 h-6 text-orange-600 mr-4 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-gray-900">SMS</div>
                        <div className="text-gray-600">{plan.sms}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mt-6">
                  <h3 className="font-semibold text-gray-900 mb-4 text-lg">Additional Benefits:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {plan.extras.map((extra, index) => (
                      <div key={index} className="flex items-center">
                        <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{extra}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Security Info */}
              <div className="bg-gradient-to-r from-orange-100 to-orange-50 rounded-2xl p-6 border border-orange-200">
                <div className="flex items-start">
                  <Shield className="w-8 h-8 text-orange-600 mr-4 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Secure Payment</h3>
                    <p className="text-gray-700 text-sm">Your payment information is encrypted and secure. We use industry-standard security measures to protect your data.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 border border-orange-100 sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-gray-700">
                    <span>Plan Price</span>
                    <span className="font-semibold">₹{plan.price}</span>
                  </div>
                  <div className="flex justify-between text-gray-700">
                    <span>GST (18%)</span>
                    <span className="font-semibold">₹{Math.round(plan.price * 0.18)}</span>
                  </div>
                  <div className="border-t border-gray-200 pt-4 flex justify-between">
                    <span className="text-lg font-bold text-gray-900">Total Amount</span>
                    <span className="text-2xl font-bold text-orange-600">₹{plan.price + Math.round(plan.price * 0.18)}</span>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Instant activation</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Zap className="w-4 h-4 mr-2 text-orange-600" />
                    <span>Valid for {plan.validity}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Shield className="w-4 h-4 mr-2 text-orange-600" />
                    <span>100% secure payment</span>
                  </div>
                </div>

                {!showPayment ? (
                  <button
                    onClick={handleProceedToPayment}
                    className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all flex items-center justify-center space-x-2 group"
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                ) : (
                  <div className="space-y-4 animate-slide-up">
                    <div className="p-4 bg-orange-50 rounded-xl border border-orange-200">
                      <div className="flex items-center mb-3">
                        <CreditCard className="w-5 h-5 text-orange-600 mr-2" />
                        <span className="font-semibold text-gray-900">Payment Method</span>
                      </div>
                      <div className="space-y-2">
                        <label className="flex items-center p-3 border-2 border-orange-300 rounded-lg cursor-pointer bg-white">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={selectedPayment === 'card'}
                            onChange={() => setSelectedPayment('card')}
                            className="mr-3" 
                          />
                          <span className="text-gray-900">Credit/Debit Card</span>
                        </label>
                        <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={selectedPayment === 'upi'}
                            onChange={() => setSelectedPayment('upi')}
                            className="mr-3" 
                          />
                          <span className="text-gray-900">UPI</span>
                        </label>
                        <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                          <input 
                            type="radio" 
                            name="payment" 
                            checked={selectedPayment === 'netbanking'}
                            onChange={() => setSelectedPayment('netbanking')}
                            className="mr-3" 
                          />
                          <span className="text-gray-900">Net Banking</span>
                        </label>
                      </div>
                    </div>
                    <button
                      onClick={handlePayment}
                      disabled={processing}
                      className="w-full py-4 bg-gradient-to-r from-orange-600 to-orange-700 text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-70 flex items-center justify-center space-x-2"
                    >
                      {processing ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <CreditCard className="w-5 h-5" />
                          <span>Pay ₹{plan.price + Math.round(plan.price * 0.18)}</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        @keyframes success-bounce {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.1);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-success-bounce {
          animation: success-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
        .animate-fade-in {
          animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}