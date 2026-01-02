"use client";

import { useEffect, useState } from "react";

export default function TermsPage() {
  const [contactInfo, setContactInfo] = useState({
    supportEmail: "",
    callNumber: ""
  });

  useEffect(() => {
    setContactInfo({
      supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "freefirelenden@gmail.com",
      callNumber: process.env.NEXT_PUBLIC_CALL_NUMBER || "03091111111"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms & Conditions</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="prose max-w-none text-gray-700">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to LendenFF ("we," "our," or "us"). These Terms and Conditions ("Terms") govern your access to and use of 
                our website, services, and applications (collectively, the "Services").
              </p>
              <p>
                By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, 
                please do not use our Services.
              </p>
            </section>

            {/* Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Eligibility</h2>
              <p className="mb-4">To use our Services, you must:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Be at least 18 years old</li>
                <li>Have the legal capacity to enter into binding contracts</li>
                <li>Be a resident of Pakistan</li>
                <li>Have a valid Pakistani mobile number for verification</li>
                <li>Not have been previously suspended or removed from our Services</li>
              </ul>
            </section>

            {/* Account Registration */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Account Registration</h2>
              <p className="mb-4">When creating an account with LendenFF, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Accept responsibility for all activities that occur under your account</li>
                <li>Notify us immediately of any unauthorized use of your account</li>
              </ul>
            </section>

            {/* Services Description */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Services Description</h2>
              <p className="mb-4">LendenFF provides a marketplace for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Buying and selling Free Fire game accounts</li>
                <li>Diamond top-up services for Free Fire</li>
                <li>Secure payment processing</li>
                <li>Account transfer services</li>
                <li>Customer support and dispute resolution</li>
              </ul>
              <p>
                We act as an intermediary between buyers and sellers and do not own the accounts being traded.
              </p>
            </section>

            {/* Prohibited Activities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited Activities</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Sell accounts that do not belong to you</li>
                <li>Provide false or misleading information</li>
                <li>Use our Services for any illegal purpose</li>
                <li>Attempt to bypass our security measures</li>
                <li>Harass, threaten, or intimidate other users</li>
                <li>Share account credentials publicly</li>
                <li>Use automated systems to access our Services</li>
                <li>Sell accounts obtained through fraudulent means</li>
                <li>Violate Free Fire's Terms of Service</li>
              </ul>
            </section>

            {/* Fees and Payments */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Fees and Payments</h2>
              <p className="mb-4">Our commission structure:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Account Sales:</strong> {process.env.NEXT_PUBLIC_COMMISSION_PAR_ACCOUNT || "1"}% commission on successful sales</li>
                <li><strong>Top-Up Services:</strong> {process.env.NEXT_PUBLIC_COMMISSION_PAR_TOPUP || "1"}% commission on diamond recharges</li>
                <li>All prices are in Pakistani Rupees (PKR)</li>
                <li>We accept JazzCash, EasyPaisa, and bank transfers</li>
                <li>Sellers receive payment within 24 hours of order completion</li>
                <li>All fees are non-refundable unless otherwise stated</li>
              </ul>
            </section>

            {/* Buyer Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Buyer Protection</h2>
              <p className="mb-4">We offer the following protections to buyers:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>24-hour account verification period</li>
                <li>Full refund if account doesn't match description</li>
                <li>Secure Gmail account transfer process</li>
                <li>Mediation services for disputes</li>
                <li>Verified seller system with ratings and reviews</li>
              </ul>
            </section>

            {/* Seller Responsibilities */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Seller Responsibilities</h2>
              <p className="mb-4">As a seller, you agree to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide accurate account information</li>
                <li>Transfer accounts within 1 hour of payment</li>
                <li>Respond to buyer inquiries promptly</li>
                <li>Maintain a minimum 4.0 seller rating</li>
                <li>Provide valid contact information</li>
                <li>Follow all platform rules and guidelines</li>
                <li>Pay applicable commission fees</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, LendenFF shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Any indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Issues arising from third-party services</li>
                <li>User disputes or misunderstandings</li>
                <li>Technical issues beyond our control</li>
                <li>Account suspensions by game publishers</li>
              </ul>
            </section>

            {/* Termination */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
              <p className="mb-4">We may terminate or suspend your account if:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You violate these Terms</li>
                <li>We suspect fraudulent activity</li>
                <li>You provide false information</li>
                <li>You harass other users</li>
                <li>You violate game Terms of Service</li>
              </ul>
            </section>

            {/* Changes to Terms */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify users of significant changes 
                via email or platform notifications. Continued use of our Services after changes constitutes acceptance 
                of the new Terms.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact Information</h2>
              <p className="mb-2">For questions about these Terms, contact us at:</p>
              <p className="mb-2">
                <strong>Email:</strong> {contactInfo.supportEmail}
              </p>
              <p>
                <strong>Phone:</strong> {contactInfo.callNumber}
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of Pakistan. Any disputes 
                arising from these Terms shall be resolved in the courts of Pakistan.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}