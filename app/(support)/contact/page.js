"use client";

import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";


export default function ContactPage() {
  const { user, isSignedIn } = useAuth();

  const CALL_NUMBER = process.env.NEXT_PUBLIC_CALL_NUMBER;
  const WHATSAPP_NUMBER = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const SUPPORT_EMAIL = process.env.NEXT_PUBLIC_SUPPORT_EMAIL;


  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isSignedIn && user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
      }));
    }
  }, [isSignedIn, user]);


  const contactMethods = [
    {
      icon: "📞",
      title: "Phone Support",
      details: "Call us for immediate assistance",
      contacts: [
        `${CALL_NUMBER} (24/7 Support)`,
        // "021-12345678 (Karachi)",
        // "042-12345678 (Lahore)",
        // "051-12345678 (Islamabad)"
      ],
      hours: "24/7 Available",
      action: `tel:${CALL_NUMBER}`,
      buttonText: "Call Now",
      color: "bg-blue-100 text-blue-700"
    },
    {
      icon: "💬",
      title: "WhatsApp",
      details: "Message us for quick responses",
      contacts: [
        `${WHATSAPP_NUMBER}`,
        `WhatsApp Business: ${WHATSAPP_NUMBER}`,
        `Seller Support: ${CALL_NUMBER}`,
        `Payment Support: ${CALL_NUMBER}`
      ],
      hours: "24/7 Available",
      action: `https://wa.me/${WHATSAPP_NUMBER}`,
      buttonText: "Message on WhatsApp",
      color: "bg-green-100 text-green-700"
    },
    {
      icon: "📧",
      title: "Email",
      details: "Email us for detailed inquiries",
      contacts: [
        `${SUPPORT_EMAIL}`,
        // "sellers@freefirelenden.pk",
        // "payments@freefirelenden.pk",
        // "reports@freefirelenden.pk"
      ],
      hours: "Response within 2 hours",
      action: `mailto: ${SUPPORT_EMAIL}`,
      buttonText: "Send Email",
      color: "bg-purple-100 text-purple-700"
    },
    {
      icon: "📍",
      title: "Office Locations",
      details: "Visit our offices",
      contacts: [
        "Lahore: Main Office, Gulberg",
        "Karachi: DHA Phase 5",
        "Islamabad: Blue Area",
        "Rawalpindi: Saddar"
      ],
      hours: "10 AM - 6 PM (Mon-Sat)",
      action: "#locations",
      buttonText: "View on Map",
      color: "bg-red-100 text-red-700"
    }
  ];

  const faqContacts = [
    {
      category: "Account Issues",
      contacts: [
        { issue: "Account not received", contact: `WhatsApp: ${WHATSAPP_NUMBER}` },
        { issue: "Wrong account details", contact: `Call: ${CALL_NUMBER}` },
        { issue: "Account banned after purchase", contact: `Email: ${SUPPORT_EMAIL}` }
      ]
    },
    {
      category: "Payment Issues",
      contacts: [
        { issue: "Payment not reflecting", contact: `WhatsApp: ${WHATSAPP_NUMBER}` },
        { issue: "Refund request", contact: `Call: ${CALL_NUMBER}` },
        { issue: "Payment method issues", contact: `Email: ${SUPPORT_EMAIL}` }
      ]
    },
    {
      category: "Seller Support",
      contacts: [
        { issue: "Seller registration", contact: `WhatsApp: ${WHATSAPP_NUMBER}` },
        { issue: "Payment delay", contact: `Call: ${CALL_NUMBER}` },
        { issue: "Account listing issues", contact: `Email: ${SUPPORT_EMAIL}` }
      ]
    }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to send message");
        return;
      }

      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });

      setTimeout(() => setSubmitted(false), 5000);

    } catch (err) {
      alert("Server error, please try again later");
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gray-50">

      <div className="pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Get in touch with LendenFF support team. We're here to help 24/7!
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12">
          {/* Contact Methods */}
          <div className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Contact Methods</h2>
              <p className="text-gray-600">Choose your preferred way to contact us</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactMethods.map((method, index) => (
                <div key={index} className="bg-white border rounded-xl p-6">
                  <div className="text-4xl mb-4">{method.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{method.title}</h3>
                  <p className="text-gray-600 mb-4">{method.details}</p>

                  <div className="space-y-2 mb-6">
                    {method.contacts.map((contact, idx) => (
                      <div key={idx} className="text-sm">
                        {contact}
                      </div>
                    ))}
                  </div>

                  <div className="text-sm text-gray-500 mb-4">
                    ⏰ {method.hours}
                  </div>

                  <a
                    href={method.action}
                    className={`block text-center px-4 py-2 rounded-lg font-medium ${method.color} hover:opacity-90`}
                  >
                    {method.buttonText}
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Send us a Message</h2>
                <p className="text-gray-600">
                  Fill out the form below and our team will get back to you within 2 hours
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Message Sent Successfully!</h3>
                  <p className="text-green-700 mb-6">
                    Thank you for contacting us. Our support team will respond within 2 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border rounded-xl p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="Enter your name"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          placeholder="0300 1234567"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="you@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <select
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Issue</option>
                        <option value="payment_issue">Payment Issue</option>
                        <option value="order_issue">Order Problem</option>
                        <option value="seller_issue">Seller Issue</option>
                        <option value="account_problem">Account Problem</option>
                        <option value="general_query">General Query</option>
                      </select>

                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows="6"
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="Describe your issue or inquiry in detail..."
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 font-medium disabled:opacity-50"
                    >
                      {loading ? 'Sending Message...' : 'Send Message'}
                    </button>

                    <p className="text-sm text-gray-500 text-center">
                      By submitting this form, you agree to our Privacy Policy and Terms of Service.
                    </p>
                  </div>
                </form>
              )}
            </div>

            {/* Quick Contacts & FAQ */}
            <div>
              {/* Quick Contacts */}
              <div className="mb-12">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Quick Contact by Issue</h3>

                <div className="space-y-6">
                  {faqContacts.map((category, index) => (
                    <div key={index} className="bg-white border rounded-xl p-6">
                      <h4 className="font-bold text-gray-900 mb-4">{category.category}</h4>
                      <div className="space-y-3">
                        {category.contacts.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                            <span className="text-gray-700">{item.issue}</span>
                            <span className="font-medium text-blue-600">{item.contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Response Time Info */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6 mb-8">
                <h3 className="font-bold text-gray-900 mb-4">📊 Our Response Times</h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">WhatsApp Messages</span>
                      <span className="font-medium text-green-600">≤ 5 minutes</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '95%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Phone Calls</span>
                      <span className="font-medium text-blue-600">Immediate</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '100%' }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700">Email Responses</span>
                      <span className="font-medium text-purple-600">≤ 2 hours</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-purple-500 rounded-full" style={{ width: '90%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Support Hours */}
              <div className="bg-white border rounded-xl p-6">
                <h3 className="font-bold text-gray-900 mb-4">🕐 Support Hours</h3>
                <div className="space-y-3">
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>24/7 Support</span>
                    <span className="font-medium text-green-600">WhatsApp & Phone</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Email Support</span>
                    <span className="font-medium">24/7 (Response within 2h)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Office Hours</span>
                    <span className="font-medium">10 AM - 6 PM (Mon-Sat)</span>
                  </div>
                  <div className="flex justify-between p-3 bg-gray-50 rounded-lg">
                    <span>Emergency Support</span>
                    <span className="font-medium text-red-600">Always Available</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Live Chat CTA */}
          <div className="mt-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Need Immediate Assistance?</h3>
            <p className="text-green-100 mb-8 max-w-2xl mx-auto">
              Start a live chat with our support team for instant help
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <a
                href={`https://wa.me/${CALL_NUMBER}`}
                className="px-8 py-3 bg-white text-green-600 rounded-xl font-bold text-lg hover:bg-gray-100"
              >
                💬 Start WhatsApp Chat
              </a>
              <a
                href="tel:0300FFLENDEN"
                className="px-8 py-3 bg-black/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold text-lg hover:bg-black/30"
              >
                📞 Call Now ({CALL_NUMBER})
              </a>
            </div>
          </div>

          {/* Office Locations */}
          <div className="mt-16" id="locations">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Office Locations</h2>
              <p className="text-gray-600">Visit us at any of our offices across Pakistan</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  city: "Lahore",
                  address: "Main Office, Gulberg III, Lahore",
                  hours: "10 AM - 6 PM (Mon-Sat)",
                  phone: "042-12345678",
                  landmark: "Near MM Alam Road"
                },
                {
                  city: "Karachi",
                  address: "DHA Phase 5, Karachi",
                  hours: "10 AM - 6 PM (Mon-Sat)",
                  phone: "021-12345678",
                  landmark: "Near Sea View"
                },
                {
                  city: "Islamabad",
                  address: "Blue Area, Islamabad",
                  hours: "10 AM - 6 PM (Mon-Sat)",
                  phone: "051-12345678",
                  landmark: "Near Jinnah Avenue"
                },
                {
                  city: "Rawalpindi",
                  address: "Saddar, Rawalpindi",
                  hours: "10 AM - 6 PM (Mon-Sat)",
                  phone: "051-87654321",
                  landmark: "Near Bank Road"
                }
              ].map((office, index) => (
                <div key={index} className="bg-white border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center text-2xl">
                      📍
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{office.city}</h3>
                      <div className="text-sm text-gray-500">{office.hours}</div>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-600">Address</div>
                      <div className="text-gray-900">{office.address}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Landmark</div>
                      <div className="text-gray-900">{office.landmark}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600">Phone</div>
                      {/* <div className="text-gray-900 font-medium">{office.phone}</div> */}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}