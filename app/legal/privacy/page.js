"use client";

import { useEffect, useState } from "react";

export default function PrivacyPage() {
  const [contactInfo, setContactInfo] = useState({
    supportEmail: "",
    whatsappNumber: ""
  });

  useEffect(() => {
    setContactInfo({
      supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "freefirelenden@gmail.com",
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "923091111111"
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="prose max-w-none text-gray-700">
            {/* Introduction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
              <p className="mb-4">
                At LendenFF, we are committed to protecting your privacy. This Privacy Policy explains how we collect, 
                use, disclose, and safeguard your information when you use our Services.
              </p>
              <p>
                By using our Services, you consent to the data practices described in this Privacy Policy. If you do 
                not agree with the terms of this Privacy Policy, please do not access or use our Services.
              </p>
            </section>

            {/* Information We Collect */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-bold mb-3">2.1 Personal Information</h3>
              <p className="mb-4">We collect the following personal information:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Contact Information:</strong> Name, email address, phone number</li>
                <li><strong>Account Information:</strong> Username, password, profile picture</li>
                <li><strong>Payment Information:</strong> JazzCash/EasyPaisa numbers, bank details (for sellers)</li>
                <li><strong>Identity Information:</strong> CNIC number (for seller verification)</li>
                <li><strong>Transaction Information:</strong> Purchase history, payment details</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">2.2 Automatically Collected Information</h3>
              <p className="mb-4">When you use our Services, we automatically collect:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Device Information:</strong> IP address, browser type, operating system</li>
                <li><strong>Usage Data:</strong> Pages visited, time spent, features used</li>
                <li><strong>Location Data:</strong> Approximate location based on IP address</li>
                <li><strong>Cookies and Tracking:</strong> Session data, preferences</li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How We Use Your Information</h2>
              <p className="mb-4">We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>To provide and maintain our Services</li>
                <li>To process transactions and payments</li>
                <li>To verify user identities and prevent fraud</li>
                <li>To communicate with you about your account</li>
                <li>To provide customer support</li>
                <li>To improve our Services and user experience</li>
                <li>To send important updates and notifications</li>
                <li>To comply with legal obligations</li>
                <li>To enforce our Terms and Conditions</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-bold mb-3">4.1 When We Share Information</h3>
              <p className="mb-4">We may share your information with:</p>
              <ul className="list-disc pl-6 mb-6 space-y-2">
                <li><strong>Service Providers:</strong> Payment processors, hosting providers, analytics services</li>
                <li><strong>Business Partners:</strong> With your consent for specific services</li>
                <li><strong>Legal Authorities:</strong> When required by law or to protect our rights</li>
                <li><strong>Other Users:</strong> Necessary information for transactions (e.g., contact info for sellers/buyers)</li>
              </ul>

              <h3 className="text-xl font-bold mb-3">4.2 What We Never Share</h3>
              <p className="mb-4">We never share:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your password or security credentials</li>
                <li>Your CNIC number (except for verification purposes)</li>
                <li>Detailed transaction history with third parties</li>
                <li>Personal conversations between users</li>
              </ul>
            </section>

            {/* Data Security */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Data Security</h2>
              <p className="mb-4">We implement appropriate security measures including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Encryption of sensitive data in transit and at rest</li>
                <li>Regular security audits and updates</li>
                <li>Access controls and authentication systems</li>
                <li>Secure payment processing</li>
                <li>Regular backups and disaster recovery plans</li>
              </ul>
              <p className="mb-4">
                However, no method of transmission over the Internet or electronic storage is 100% secure. 
                While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data Retention</h2>
              <p className="mb-4">We retain your information for as long as necessary to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Provide you with our Services</li>
                <li>Comply with legal obligations</li>
                <li>Resolve disputes and enforce agreements</li>
                <li>Maintain business records</li>
              </ul>
              <p>
                When we no longer need your information, we securely delete or anonymize it.
              </p>
            </section>

            {/* Your Rights */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Your Rights</h2>
              <p className="mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Access:</strong> Request a copy of your personal information</li>
                <li><strong>Correction:</strong> Update or correct your information</li>
                <li><strong>Deletion:</strong> Request deletion of your information</li>
                <li><strong>Restriction:</strong> Limit how we use your information</li>
                <li><strong>Portability:</strong> Request transfer of your data</li>
                <li><strong>Objection:</strong> Object to certain processing activities</li>
                <li><strong>Withdraw Consent:</strong> Withdraw consent at any time</li>
              </ul>
              <p>
                To exercise these rights, contact us at {contactInfo.supportEmail}
              </p>
            </section>

            {/* Cookies and Tracking */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Cookies and Tracking Technologies</h2>
              <p className="mb-4">We use cookies and similar technologies for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Performance Cookies:</strong> To analyze usage patterns</li>
                <li><strong>Functional Cookies:</strong> To remember preferences</li>
                <li><strong>Advertising Cookies:</strong> To show relevant ads</li>
              </ul>
              <p className="mb-4">
                You can control cookies through your browser settings. However, disabling cookies may affect 
                the functionality of our Services.
              </p>
            </section>

            {/* Third-Party Links */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Third-Party Links</h2>
              <p className="mb-4">
                Our Services may contain links to third-party websites. This Privacy Policy does not apply to 
                those websites. We encourage you to review the privacy policies of any third-party sites you visit.
              </p>
            </section>

            {/* Children's Privacy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Children's Privacy</h2>
              <p className="mb-4">
                Our Services are not intended for children under 18 years of age. We do not knowingly collect 
                personal information from children under 18. If we learn we have collected information from a 
                child under 18, we will delete that information promptly.
              </p>
            </section>

            {/* International Data Transfers */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. International Data Transfers</h2>
              <p className="mb-4">
                Your information may be transferred to and processed in countries other than Pakistan. 
                We ensure appropriate safeguards are in place to protect your information during such transfers.
              </p>
            </section>

            {/* Changes to Privacy Policy */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Changes to Privacy Policy</h2>
              <p className="mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting 
                the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
              <p>
                We encourage you to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Contact Us */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Us</h2>
              <p className="mb-2">If you have questions about this Privacy Policy, contact us:</p>
              <p className="mb-2">
                <strong>Email:</strong> {contactInfo.supportEmail}
              </p>
              <p className="mb-2">
                <strong>WhatsApp:</strong> {contactInfo.whatsappNumber}
              </p>
              <p>
                <strong>Response Time:</strong> We aim to respond to privacy inquiries within 48 hours.
              </p>
            </section>

            {/* Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Compliance with Pakistani Laws</h2>
              <p>
                This Privacy Policy is designed to comply with applicable data protection laws in Pakistan, 
                including the Prevention of Electronic Crimes Act and any other relevant legislation.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}