"use client";

import { useEffect, useState } from "react";

export default function RefundPolicyPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Refund & Cancellation Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="prose max-w-none text-gray-700">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                This Refund & Cancellation Policy outlines the conditions under which refunds are granted and 
                the cancellation procedures for transactions on LendenFF.
              </p>
              <p>
                By using our Services, you agree to this policy. Please read it carefully before making any 
                purchases on our platform.
              </p>
            </section>

            {/* Buyer Protection */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. 24-Hour Buyer Protection</h2>
              <p className="mb-4">We offer 24-hour buyer protection for all account purchases:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Full refund if account doesn't match the description</li>
                <li>Full refund if seller fails to deliver within 24 hours</li>
                <li>Full refund if account is recovered by seller</li>
                <li>Full refund if credentials don't work</li>
                <li>Partial refund for minor discrepancies (case-by-case)</li>
              </ul>
              <p className="mb-4">
                <strong>Important:</strong> Refund requests must be made within 24 hours of purchase. 
                After 24 hours, no refunds will be granted.
              </p>
            </section>

            {/* Refund Eligibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Refund Eligibility Criteria</h2>
              
              <h3 className="text-xl font-bold mb-3">3.1 Eligible for Full Refund</h3>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Account doesn't match the description (rank, level, items, etc.)</li>
                <li>Account credentials provided are incorrect</li>
                <li>Seller fails to deliver account within 24 hours</li>
                <li>Account gets recovered/pulled back by seller</li>
                <li>Technical issues preventing account access</li>
                <li>Duplicate account (already sold to another buyer)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">3.2 Not Eligible for Refund</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Change of mind after purchase</li>
                <li>Not liking the account after receiving it</li>
                <li>Minor cosmetic differences not mentioned in description</li>
                <li>Buyer's inability to access the account due to personal device issues</li>
                <li>Game bans or restrictions applied after purchase</li>
                <li>Refund request made after 24 hours</li>
                <li>Account modified by buyer after receipt</li>
              </ul>
            </section>

            {/* Refund Process */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Refund Process</h2>
              <p className="mb-4">To request a refund:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Contact our support team within 24 hours of purchase</li>
                <li>Provide your order ID and details of the issue</li>
                <li>Provide evidence (screenshots, videos) supporting your claim</li>
                <li>Our team will investigate within 24 hours</li>
                <li>If approved, refund will be processed within 3-5 business days</li>
              </ol>
              <p className="mb-4">
                <strong>Evidence Required:</strong> Screenshots showing discrepancies, videos demonstrating 
                login issues, chat logs with seller, etc.
              </p>
            </section>

            {/* Top-Up Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Diamond Top-Up Refunds</h2>
              <p className="mb-4">For diamond top-up services:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Full Refund:</strong> If diamonds are not delivered within 6 hours</li>
                <li><strong>Full Refund:</strong> If wrong amount of diamonds delivered</li>
                <li><strong>Full Refund:</strong> If diamonds delivered to wrong Player ID</li>
                <li><strong>No Refund:</strong> If diamonds successfully delivered to correct Player ID</li>
                <li><strong>No Refund:</strong> For change of mind after ordering</li>
              </ul>
              <p>
                Top-up refund requests must include screenshot proof of missing/wrong diamonds.
              </p>
            </section>

            {/* Commission Fees */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Commission Fees on Refunds</h2>
              <p className="mb-4">Commission fees are non-refundable in most cases:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>If refund is due to seller fault: Commission refunded to buyer</li>
                <li>If refund is due to buyer fault: Commission not refunded</li>
                <li>If mutual agreement to cancel: Commission may be partially refunded</li>
                <li>Platform commission: {process.env.NEXT_PUBLIC_COMMISSION_PAR_ACCOUNT || "1"}% for accounts, {process.env.NEXT_PUBLIC_COMMISSION_PAR_TOPUP || "1"}% for top-ups</li>
              </ul>
            </section>

            {/* Cancellation Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Order Cancellation</h2>
              
              <h3 className="text-xl font-bold mb-3">7.1 Buyer Cancellation</h3>
              <p className="mb-4">Buyers may cancel an order:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li>Before payment is processed: Free cancellation</li>
                <li>After payment but before delivery: 10% cancellation fee</li>
                <li>After account received: No cancellation allowed (refund policy applies)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">7.2 Seller Cancellation</h3>
              <p className="mb-4">Sellers may cancel an order only if:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account is no longer available (must provide proof)</li>
                <li>Technical issues preventing transfer</li>
                <li>Mutual agreement with buyer</li>
              </ul>
              <p className="mb-4">
                <strong>Penalty:</strong> Sellers who cancel orders without valid reason will receive a 
                negative rating and may face account suspension.
              </p>
            </section>

            {/* Payment Method Refunds */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Payment Method Specific Refunds</h2>
              
              <h3 className="text-xl font-bold mb-3">8.1 JazzCash Refunds</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Refund processing time: 1-3 business days</li>
                <li>Refunded to original JazzCash number</li>
                <li>No JazzCash fees for refunds</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">8.2 EasyPaisa Refunds</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Refund processing time: 1-3 business days</li>
                <li>Refunded to original EasyPaisa number</li>
                <li>No EasyPaisa fees for refunds</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">8.3 Bank Transfer Refunds</h3>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Refund processing time: 3-5 business days</li>
                <li>Refunded to original bank account</li>
                <li>Bank charges may apply (deducted from refund)</li>
              </ul>
            </section>

            {/* Dispute Resolution */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Dispute Resolution</h2>
              <p className="mb-4">In case of disputes:</p>
              <ol className="list-decimal pl-6 mb-4 space-y-2">
                <li>Contact our support team first</li>
                <li>Provide all relevant evidence</li>
                <li>Our team will mediate between buyer and seller</li>
                <li>If mediation fails, our decision will be final</li>
                <li>In complex cases, resolution may take up to 7 days</li>
              </ol>
              <p>
                We aim to resolve all disputes fairly and transparently.
              </p>
            </section>

            {/* Fraud Prevention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Fraud Prevention</h2>
              <p className="mb-4">To prevent fraudulent refund claims:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>We verify all refund requests thoroughly</li>
                <li>We track user refund history</li>
                <li>Users with multiple refund requests may be investigated</li>
                <li>Fraudulent refund claims may result in account suspension</li>
                <li>Legal action may be taken in severe cases</li>
              </ul>
            </section>

            {/* Force Majeure */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Force Majeure</h2>
              <p className="mb-4">
                We are not liable for delays or failures in processing refunds due to circumstances beyond our 
                control, including but not limited to:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Bank/payment processor outages</li>
                <li>Technical failures</li>
                <li>Natural disasters</li>
                <li>Government restrictions</li>
                <li>Internet service disruptions</li>
              </ul>
            </section>

            {/* Policy Updates */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Policy Updates</h2>
              <p className="mb-4">
                We may update this Refund & Cancellation Policy from time to time. Changes will be effective 
                immediately upon posting on our website.
              </p>
              <p>
                It is your responsibility to review this policy periodically for changes.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="mb-2">For refund requests and questions, contact us:</p>
              <p className="mb-2">
                <strong>Email:</strong> {contactInfo.supportEmail}
              </p>
              <p>
                <strong>Phone:</strong> {contactInfo.callNumber} (10 AM - 10 PM, 7 days a week)
              </p>
              <p className="mt-4">
                <strong>Response Time:</strong> We aim to respond to refund requests within 24 hours 
                during business days.
              </p>
            </section>

            {/* Important Notes */}
            <section className="mt-12 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
              <h3 className="font-bold text-yellow-800 mb-4">⚠️ Important Notes</h3>
              <ul className="list-disc pl-6 text-yellow-700 space-y-2">
                <li>Always verify account details before making payment</li>
                <li>Keep screenshots of all transactions and conversations</li>
                <li>Report issues immediately - don't wait until the last minute</li>
                <li>Be honest in your refund claims - false claims may lead to account suspension</li>
                <li>Refunds are processed to the original payment method only</li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}