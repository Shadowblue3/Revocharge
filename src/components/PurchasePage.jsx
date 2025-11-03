import React, { useState } from 'react';
import { Check, CreditCard, ArrowLeft, Shield, Zap, Clock, Phone, Database, Radio, Package, ChevronRight } from 'lucide-react';

// Mock Navbar component
const Navbar = () => (
  <div className="fixed top-0 left-0 right-0 bg-white shadow-md z-50 px-4 py-4">
    <div className="max-w-7xl mx-auto flex items-center justify-between">
      <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-800 bg-clip-text text-transparent">
        RevoCharge
      </div>
    </div>
  </div>
);

export default function PurchasePage() {
  const [showPayment, setShowPayment] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);

  // Sample plan data (in real app, this would come from route params or props)
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

  const handlePayment = () => {
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      setSuccess(true);
    }, 2500);
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
            onClick={() => window.location.reload()}
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

      {/* Header */}
      <div className="relative z-10 pt-24 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => window.history.back()}
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
                          <input type="radio" name="payment" defaultChecked className="mr-3" />
                          <span className="text-gray-900">Credit/Debit Card</span>
                        </label>
                        <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                          <input type="radio" name="payment" className="mr-3" />
                          <span className="text-gray-900">UPI</span>
                        </label>
                        <label className="flex items-center p-3 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-orange-300 transition-colors">
                          <input type="radio" name="payment" className="mr-3" />
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
        .animate-scale-in {
          animation: scale-in 0.5s ease-out forwards;
        }
        .animate-success-bounce {
          animation: success-bounce 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        .animate-slide-up {
          animation: slide-up 0.4s ease-out forwards;
        }
      `}</style>
    </div>
  );
}