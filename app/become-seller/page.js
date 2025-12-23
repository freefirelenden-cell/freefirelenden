"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";


export default function BecomeSellerPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    shopName: "",
    phone: "",
    paymentMethod: "",
    paymentAccount: "",
    sellingType: "account",
    termsAccepted: false
  });

  const [errors, setErrors] = useState({});

  const paymentMethods = [
    { value: "jazzcash", label: "JazzCash", icon: "📱" },
    { value: "easypaisa", label: "EasyPaisa", icon: "💳" },
    { value: "bank", label: "Bank Transfer", icon: "🏦" },
    { value: "other", label: "Other", icon: "💰" }
  ];

  const sellingTypes = [
    {
      value: "account",
      label: "Sell Free Fire Accounts",
      description: "List and sell Free Fire game accounts",
      icon: "🎮"
    },
    {
      value: "topup",
      label: "Diamond Top-Up Service",
      description: "Recharge diamonds for Free Fire players",
      icon: "💎"
    },
    {
      value: "both",
      label: "Both Services",
      description: "Sell accounts and provide top-up services",
      icon: "🚀"
    }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ""
      }));
    }
  };

  const validateStep = (stepNumber) => {
    const newErrors = {};
    
    if (stepNumber === 1) {
      if (!formData.shopName.trim()) {
        newErrors.shopName = "Shop name is required";
      } else if (formData.shopName.length < 3) {
        newErrors.shopName = "Shop name must be at least 3 characters";
      }
      
      if (!formData.phone.trim()) {
        newErrors.phone = "Phone number is required";
      } else if (!/^\d{11}$/.test(formData.phone.replace(/\D/g, ''))) {
        newErrors.phone = "Enter a valid 11-digit Pakistani phone number";
      }
    }
    
    if (stepNumber === 2) {
      if (!formData.paymentMethod) {
        newErrors.paymentMethod = "Please select a payment method";
      }
      
      if (!formData.paymentAccount.trim()) {
        newErrors.paymentAccount = "Payment account number is required";
      }
    }
    
    if (stepNumber === 3) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = "You must accept the terms and conditions";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
    }
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateStep(step)) return;

  try {
    setLoading(true);

    const res = await fetch("/api/seller/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Something went wrong");
      return;
    }

    alert("Seller request submitted. Admin will review it.");
    router.push("/seller");
  } catch (err) {
    alert("Server error. Try again later.");
  } finally {
    setLoading(false);
  }
};

  const requirements = [
    "Valid Pakistani CNIC",
    "Active Pakistani phone number",
    "Bank account or mobile wallet (JazzCash/EasyPaisa)",
    "At least 18 years old",
    "Agreement to follow marketplace rules"
  ];

  const benefits = [
    { icon: "💰", title: "Earn Money", desc: "Earn 10,000-50,000 PKR per month" },
    { icon: "🛡️", title: "Secure Payments", desc: "Protected transactions, no chargebacks" },
    { icon: "📈", title: "Grow Your Business", desc: "Access thousands of buyers" },
    { icon: "⚡", title: "Instant Payouts", desc: "Get paid within 24 hours" },
    { icon: "🎯", title: "Verified Badge", desc: "Build trust with verified status" },
    { icon: "📱", title: "Seller Dashboard", desc: "Easy-to-use management tools" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white py-12">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Become a Verified Seller</h1>
            <p className="text-yellow-100 text-lg">
              Start earning money by selling Free Fire accounts and diamond top-ups
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Benefits */}
            <div className="lg:col-span-2">
              {/* Progress Steps */}
              <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
                <div className="flex justify-between mb-8">
                  {[1, 2, 3].map((stepNumber) => (
                    <div key={stepNumber} className="flex flex-col items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold mb-2 ${
                        step >= stepNumber ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-400'
                      }`}>
                        {stepNumber}
                      </div>
                      <span className="text-sm">
                        {stepNumber === 1 ? 'Basic Info' : stepNumber === 2 ? 'Payment' : 'Review'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit}>
                  {/* Step 1: Basic Information */}
                  {step === 1 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Basic Information</h3>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Shop Name *
                        </label>
                        <input
                          type="text"
                          name="shopName"
                          value={formData.shopName}
                          onChange={handleChange}
                          placeholder="e.g., Pro FF Accounts"
                          className={`w-full border rounded-lg px-4 py-3 ${
                            errors.shopName ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.shopName && (
                          <p className="text-red-500 text-sm mt-1">{errors.shopName}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="flex">
                          {/* <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 rounded-l-lg">
                            +92
                          </span> */}
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleChange}
                            placeholder="03XX XXXXXXX"
                            className={`flex-1 border rounded-r-lg px-4 py-3 ${
                              errors.phone ? 'border-red-500' : 'border-gray-300'
                            }`}
                          />
                        </div>
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">We'll verify this number via SMS</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          What do you want to sell? *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {sellingTypes.map((type) => (
                            <label
                              key={type.value}
                              className={`border rounded-lg p-4 cursor-pointer transition-all ${
                                formData.sellingType === type.value
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300 hover:border-blue-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="sellingType"
                                value={type.value}
                                checked={formData.sellingType === type.value}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <div className="text-2xl mb-2">{type.icon}</div>
                              <div className="font-bold">{type.label}</div>
                              <div className="text-sm text-gray-600 mt-1">{type.description}</div>
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Payment Information */}
                  {step === 2 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Payment Information</h3>
                      <p className="text-gray-600">Where should we send your earnings?</p>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Payment Method *
                        </label>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

            
                          {paymentMethods.map((method) => (
                            <label
                              key={method.value}
                              className={`border rounded-lg p-4 cursor-pointer text-center ${
                                formData.paymentMethod === method.value
                                  ? 'border-blue-500 bg-blue-300'
                                  : 'border-gray-300 hover:border-blue-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="paymentMethod"
                                value={method.value}
                                disabled={method.value == "other" || method.value == "bank"}
                                checked={formData.paymentMethod === method.value}
                                onChange={handleChange}
                                className="hidden"
                              />
                              <div className="text-2xl mb-2">{method.icon}</div>
                              <div className="font-medium">{method.label}</div>
                            </label>
                          ))}
                        </div>
                        {errors.paymentMethod && (
                          <p className="text-red-500 text-sm mt-1">{errors.paymentMethod}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Account Number *
                        </label>
                        <input
                          type="text"
                          name="paymentAccount"
                          value={formData.paymentAccount}
                          onChange={handleChange}
                          placeholder={
                            formData.paymentMethod === 'jazzcash' ? 'JazzCash Number (0321XXXXXXX)' :
                            formData.paymentMethod === 'easypaisa' ? 'EasyPaisa Number (0315XXXXXXX)' :
                            formData.paymentMethod === 'bank' ? 'Bank Account Number or IBAN' :
                            'Account Number'
                          }
                          className={`w-full border rounded-lg px-4 py-3 ${
                            errors.paymentAccount ? 'border-red-500' : 'border-gray-300'
                          }`}
                        />
                        {errors.paymentAccount && (
                          <p className="text-red-500 text-sm mt-1">{errors.paymentAccount}</p>
                        )}
                        <p className="text-sm text-gray-500 mt-1">
                          Ensure this is correct to receive payments
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Review & Submit */}
                  {step === 3 && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold">Review & Submit</h3>
                      
                      <div className="bg-gray-50 rounded-lg p-6">
                        <h4 className="font-bold mb-4">Application Summary</h4>
                        
                        <div className="space-y-4">
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Shop Name:</span>
                            <span className="font-medium">{formData.shopName}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Phone:</span>
                            <span className="font-medium">+92 {formData.phone}</span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Selling Type:</span>
                            <span className="font-medium">
                              {sellingTypes.find(t => t.value === formData.sellingType)?.label}
                            </span>
                          </div>
                          <div className="flex justify-between border-b pb-2">
                            <span className="text-gray-600">Payment Method:</span>
                            <span className="font-medium">
                              {paymentMethods.find(m => m.value === formData.paymentMethod)?.label}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Account Number:</span>
                            <span className="font-medium">{formData.paymentAccount}</span>
                          </div>
                        </div>
                      </div>
                      
                      
                      
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h4 className="font-bold text-yellow-800 mb-2">⚠️ Important Notes</h4>
                        <ul className="text-sm text-yellow-700 space-y-1">
                          <li>• Verification process takes 24-48 hours</li>
                          <li>• You must provide CNIC for verification (will be requested later)</li>
                          <li>• Commission rate: 5% on all successful sales</li>
                          <li>• Payments are processed weekly</li>
                          <li>• All transactions must comply with platform rules</li>
                        </ul>
                      </div>

                      <div>
                        <label className="flex items-start gap-3">
                          <input
                            type="checkbox"
                            name="termsAccepted"
                            checked={formData.termsAccepted}
                            onChange={handleChange}
                            className="mt-1"
                          />
                          <div>
                            <span className="font-medium">I agree to the </span>
                            <a href="/terms" className="text-blue-600 hover:underline">Terms & Conditions</a>
                            <span className="font-medium"> and </span>
                            <a href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</a>
                            <p className="text-gray-600 text-sm mt-1">
                              I confirm that all information provided is accurate and I meet all requirements
                            </p>
                          </div>
                        </label>
                        {errors.termsAccepted && (
                          <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-8">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                      >
                        ← Back
                      </button>
                    ) : (
                      <div></div>
                    )}
                    
                    {step < 3 ? (
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                      >
                        Continue →
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 disabled:opacity-50"
                      >
                        {loading ? 'Submitting...' : 'Submit Application'}
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Requirements */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-bold mb-6">Requirements to Become a Seller</h3>
                <ul className="space-y-4">
                  {requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="text-green-500 text-xl">✓</span>
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column - Benefits */}
            <div className="space-y-6">
              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-blue-600 to-purple-600 text-white rounded-xl p-6">
                <h3 className="text-xl font-bold mb-6">Seller Benefits</h3>
                <div className="space-y-6">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <div className="font-bold">{benefit.title}</div>
                        <div className="text-blue-200 text-sm">{benefit.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Info */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-4">Commission Structure</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span>Account Sales</span>
                    <span className="font-bold text-green-600">5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span>Diamond Top-Ups</span>
                    <span className="font-bold text-purple-600">3%</span>
                  </div>
                  <div className="text-sm text-gray-600 mt-4">
                    * Minimum commission: PKR 50 per transaction
                  </div>
                </div>
              </div>

              {/* FAQ */}
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="font-bold mb-4">FAQs</h3>
                <div className="space-y-4">
                  <div>
                    <div className="font-medium text-gray-900">How long does verification take?</div>
                    <div className="text-sm text-gray-600">Usually 24-48 hours after document submission</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">When do I get paid?</div>
                    <div className="text-sm text-gray-600">Weekly payments every Monday</div>
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Can I sell both accounts and top-ups?</div>
                    <div className="text-sm text-gray-600">Yes, select "Both Services" during registration</div>
                  </div>
                </div>
              </div>

              {/* Support */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
                <h3 className="font-bold mb-4">Need Help?</h3>
                <div className="space-y-3">
                  <a href="tel:0300FFLENDEN" className="flex items-center gap-3 text-blue-600 hover:text-blue-800">
                    <span className="text-xl">📞</span>
                    <span>0300-FFLENDEN</span>
                  </a>
                  <a href="https://wa.me/923001234567" className="flex items-center gap-3 text-green-600 hover:text-green-800">
                    <span className="text-xl">💬</span>
                    <span>WhatsApp Support</span>
                  </a>
                  <a href="mailto:support@freefirelenden.pk" className="flex items-center gap-3 text-purple-600 hover:text-purple-800">
                    <span className="text-xl">📧</span>
                    <span>Email Support</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}