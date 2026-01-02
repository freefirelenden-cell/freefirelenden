"use client";

import { useState } from "react";

export default function CookiePolicyPage() {
  const [cookiesEnabled, setCookiesEnabled] = useState({
    essential: true,
    performance: true,
    functional: false,
    advertising: false
  });

  const handleCookieToggle = (cookieType) => {
    setCookiesEnabled(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Cookie Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="prose max-w-none text-gray-700">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. What Are Cookies?</h2>
              <p className="mb-4">
                Cookies are small text files that are placed on your computer or mobile device when you visit 
                our website. They help us provide you with a better experience by:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Remembering your preferences and settings</li>
                <li>Understanding how you use our website</li>
                <li>Improving our services and user experience</li>
                <li>Providing relevant content and advertisements</li>
              </ul>
            </section>

            {/* Types of Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Types of Cookies We Use</h2>
              
              <h3 className="text-xl font-bold mb-3">2.1 Essential Cookies</h3>
              <p className="mb-4">
                These cookies are necessary for the website to function properly. They enable basic functions 
                like page navigation and access to secure areas.
              </p>
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">Essential Cookies</span>
                    <p className="text-sm text-gray-600">Required for basic functionality</p>
                  </div>
                  <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                    Always Enabled
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">2.2 Performance Cookies</h3>
              <p className="mb-4">
                These cookies help us understand how visitors interact with our website by collecting and 
                reporting information anonymously.
              </p>
              <div className="bg-green-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">Performance Cookies</span>
                    <p className="text-sm text-gray-600">Help us improve our website</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiesEnabled.performance}
                      onChange={() => handleCookieToggle('performance')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">2.3 Functional Cookies</h3>
              <p className="mb-4">
                These cookies allow the website to remember choices you make (such as your username, language, 
                or region) and provide enhanced, more personal features.
              </p>
              <div className="bg-purple-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">Functional Cookies</span>
                    <p className="text-sm text-gray-600">Remember your preferences</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiesEnabled.functional}
                      onChange={() => handleCookieToggle('functional')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                  </label>
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">2.4 Advertising Cookies</h3>
              <p className="mb-4">
                These cookies are used to deliver advertisements more relevant to you and your interests.
              </p>
              <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold">Advertising Cookies</span>
                    <p className="text-sm text-gray-600">Show relevant ads</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={cookiesEnabled.advertising}
                      onChange={() => handleCookieToggle('advertising')}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-600"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Cookie Duration */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Cookie Duration</h2>
              <p className="mb-4">Cookies can be categorized by their duration:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>
                  <strong>Session Cookies:</strong> Temporary cookies that expire when you close your browser
                </li>
                <li>
                  <strong>Persistent Cookies:</strong> Remain on your device for a set period or until deleted
                </li>
              </ul>
            </section>

            {/* Third-Party Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Third-Party Cookies</h2>
              <p className="mb-4">
                We may use cookies from third-party services for the following purposes:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Google Analytics:</strong> Website traffic analysis</li>
                <li><strong>Payment Processors:</strong> Secure transaction processing</li>
                <li><strong>Advertising Networks:</strong> Relevant ad delivery</li>
                <li><strong>Social Media:</strong> Social sharing features</li>
              </ul>
              <p>
                Third-party cookies are subject to the respective privacy policies of these third parties.
              </p>
            </section>

            {/* Managing Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Managing Cookies</h2>
              
              <h3 className="text-xl font-bold mb-3">5.1 Browser Settings</h3>
              <p className="mb-4">You can control cookies through your browser settings:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Chrome:</strong> Settings → Privacy and security → Cookies and other site data</li>
                <li><strong>Firefox:</strong> Options → Privacy & Security → Cookies and Site Data</li>
                <li><strong>Safari:</strong> Preferences → Privacy → Cookies and website data</li>
                <li><strong>Edge:</strong> Settings → Cookies and site permissions → Cookies and data stored</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">5.2 What Happens If You Disable Cookies</h3>
              <p className="mb-4">
                If you disable cookies, some features of our website may not function properly:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You may need to re-enter information each time you visit</li>
                <li>Personalized features may not work</li>
                <li>Some services may be unavailable</li>
                <li>Website performance may be affected</li>
              </ul>
            </section>

            {/* Your Choices */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Your Cookie Choices</h2>
              <p className="mb-4">
                When you first visit our website, you will see a cookie consent banner where you can:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Accept all cookies</li>
                <li>Reject non-essential cookies</li>
                <li>Customize your cookie preferences</li>
                <li>Learn more about our cookie usage</li>
              </ul>
              <p>
                You can change your cookie preferences at any time by visiting this page or using the 
                cookie settings in your browser.
              </p>
            </section>

            {/* Do Not Track */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Do Not Track Signals</h2>
              <p className="mb-4">
                Some browsers have a "Do Not Track" feature that lets you tell websites you do not want 
                to have your online activities tracked.
              </p>
              <p>
                Currently, we do not respond to "Do Not Track" signals because there is no standard for 
                how websites should respond to such signals.
              </p>
            </section>

            {/* Children and Cookies */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Children and Cookies</h2>
              <p className="mb-4">
                Our Services are not intended for children under 18 years of age. We do not knowingly 
                collect personal information from children under 18 through cookies or other means.
              </p>
            </section>

            {/* Updates to Cookie Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Updates to Cookie Policy</h2>
              <p className="mb-4">
                We may update this Cookie Policy from time to time to reflect changes in our practices 
                or for other operational, legal, or regulatory reasons.
              </p>
              <p>
                We encourage you to review this Cookie Policy periodically to stay informed about our 
                use of cookies.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Contact Information</h2>
              <p className="mb-2">If you have questions about our Cookie Policy, contact us:</p>
              <p className="mb-2">
                <strong>Email:</strong> {process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "freefirelenden@gmail.com"}
              </p>
              <p>
                We aim to respond to cookie-related inquiries within 48 hours.
              </p>
            </section>

            {/* Current Cookie Settings */}
            <section className="mt-12 p-6 bg-blue-50 border border-blue-200 rounded-xl">
              <h3 className="font-bold text-blue-800 mb-4">Your Current Cookie Settings</h3>
              <div className="space-y-4">
                {Object.entries(cookiesEnabled).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="capitalize">{key} Cookies</span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                      value ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {value ? 'Enabled' : 'Disabled'}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => {
                  setCookiesEnabled({
                    essential: true,
                    performance: true,
                    functional: true,
                    advertising: false
                  });
                }}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm"
              >
                Update Cookie Preferences
              </button>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}