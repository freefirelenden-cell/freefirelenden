"use client";

import { useEffect, useState } from "react";

export default function DisclaimerPage() {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-6">Disclaimer</h1>
          <p className="text-gray-600 mb-8">Last updated: January 2024</p>

          <div className="prose max-w-none text-gray-700">
            {/* Important Notice */}
            <div className="mb-8 p-6 bg-red-50 border border-red-200 rounded-xl">
              <h3 className="font-bold text-red-800 mb-4">⚠️ IMPORTANT LEGAL NOTICE</h3>
              <p className="text-red-700">
                Please read this disclaimer carefully before using LendenFF services. By using our platform, 
                you acknowledge and agree to the terms outlined below.
              </p>
            </div>

            {/* General Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. General Disclaimer</h2>
              <p className="mb-4">
                LendenFF provides a marketplace platform for buying and selling Free Fire accounts and 
                diamond top-up services. We are an independent platform and are not affiliated with, 
                endorsed by, sponsored by, or otherwise connected to Garena Free Fire or its parent company.
              </p>
              <p>
                The information, products, and services offered on this platform are provided "as is" 
                without any warranties or representations of any kind, either express or implied.
              </p>
            </section>

            {/* Account Trading Risks */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Account Trading Risks</h2>
              <p className="mb-4">Trading game accounts involves certain risks, including:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Account recovery by original owner</li>
                <li>Account suspension or banning by game publisher</li>
                <li>Loss of account access due to password changes</li>
                <li>Violation of game Terms of Service</li>
                <li>Potential legal implications</li>
                <li>Financial loss</li>
              </ul>
              <p>
                By using our services, you acknowledge these risks and agree that LendenFF is not responsible 
                for any consequences resulting from account trading.
              </p>
            </section>

            {/* No Affiliation */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. No Affiliation with Game Publishers</h2>
              <p className="mb-4">
                LendenFF is an independent marketplace and has no affiliation, association, endorsement, 
                or connection with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Garena Free Fire</li>
                <li>Garena International</li>
                <li>Sea Limited</li>
                <li>Any other game publisher or developer</li>
              </ul>
              <p>
                We do not claim to represent or be endorsed by any game publisher. All game assets, characters, 
                and intellectual property belong to their respective owners.
              </p>
            </section>

            {/* User Responsibility */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. User Responsibility</h2>
              <p className="mb-4">As a user of LendenFF, you are responsible for:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Complying with game Terms of Service</li>
                <li>Ensuring account ownership before selling</li>
                <li>Verifying account details before purchasing</li>
                <li>Keeping your account credentials secure</li>
                <li>Reporting suspicious activities</li>
                <li>Understanding the risks involved in account trading</li>
                <li>Complying with local laws and regulations</li>
              </ul>
            </section>

            {/* Limitation of Liability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Limitation of Liability</h2>
              <p className="mb-4">
                To the maximum extent permitted by law, LendenFF and its affiliates shall not be liable for:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Any direct, indirect, incidental, or consequential damages</li>
                <li>Loss of profits, data, or business opportunities</li>
                <li>Account suspensions or bans by game publishers</li>
                <li>User disputes or misunderstandings</li>
                <li>Technical issues beyond our control</li>
                <li>Third-party actions or negligence</li>
                <li>Force majeure events</li>
              </ul>
              <p className="mb-4">
                Our maximum liability to you for any claim arising from our services shall not exceed 
                the amount you paid for the specific transaction in question.
              </p>
            </section>

            {/* No Warranty */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. No Warranty</h2>
              <p className="mb-4">
                We make no warranties or representations about:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>The accuracy or completeness of account descriptions</li>
                <li>The availability or quality of services</li>
                <li>The security of transactions</li>
                <li>The legality of account trading in your jurisdiction</li>
                <li>The compatibility of accounts with game updates</li>
                <li>The longevity of account access</li>
              </ul>
              <p>
                All services are provided on an "as is" and "as available" basis without any warranty.
              </p>
            </section>

            {/* Indemnification */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Indemnification</h2>
              <p className="mb-4">
                You agree to indemnify, defend, and hold harmless LendenFF and its affiliates from and against 
                any and all claims, liabilities, damages, losses, costs, and expenses arising from:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Your use of our services</li>
                <li>Your violation of these terms</li>
                <li>Your violation of any rights of another party</li>
                <li>Your violation of any applicable laws</li>
                <li>Your account trading activities</li>
                <li>Any content you submit or share</li>
              </ul>
            </section>

            {/* Legal Compliance */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Legal Compliance</h2>
              <p className="mb-4">
                You are responsible for ensuring that your use of our services complies with:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Local laws and regulations</li>
                <li>Game Terms of Service</li>
                <li>Age restrictions and requirements</li>
                <li>Tax obligations</li>
                <li>Consumer protection laws</li>
                <li>Digital transaction regulations</li>
              </ul>
              <p>
                We do not provide legal advice. Consult with a legal professional if you have questions 
                about the legality of account trading in your jurisdiction.
              </p>
            </section>

            {/* Age Restriction */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Age Restriction</h2>
              <p className="mb-4">
                Our services are intended for users who are 18 years of age or older. By using our services, 
                you represent and warrant that:
              </p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>You are at least 18 years old</li>
                <li>You have the legal capacity to enter into binding contracts</li>
                <li>You are not prohibited from using our services by any applicable law</li>
              </ul>
              <p>
                If you are under 18, you may not use our services without parental consent and supervision.
              </p>
            </section>

            {/* Changes to Disclaimer */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Changes to Disclaimer</h2>
              <p className="mb-4">
                We reserve the right to modify this disclaimer at any time. Changes will be effective 
                immediately upon posting on our website.
              </p>
              <p>
                Your continued use of our services after any changes constitutes acceptance of the modified 
                disclaimer.
              </p>
            </section>

            {/* Governing Law */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing Law</h2>
              <p className="mb-4">
                This disclaimer shall be governed by and construed in accordance with the laws of Pakistan, 
                without regard to its conflict of law provisions.
              </p>
              <p>
                Any disputes arising from this disclaimer shall be subject to the exclusive jurisdiction 
                of the courts of Pakistan.
              </p>
            </section>

            {/* Severability */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Severability</h2>
              <p className="mb-4">
                If any provision of this disclaimer is found to be invalid or unenforceable, the remaining 
                provisions will remain in full force and effect.
              </p>
            </section>

            {/* Contact Information */}
            <section className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="mb-2">For questions about this disclaimer, contact us:</p>
              <p className="mb-2">
                <strong>Email:</strong> {contactInfo.supportEmail}
              </p>
              <p>
                <strong>Phone:</strong> {contactInfo.callNumber}
              </p>
            </section>

            {/* Final Acknowledgment */}
            <section className="mt-12 p-6 bg-gray-100 border border-gray-300 rounded-xl">
              <h3 className="font-bold text-gray-900 mb-4">Final Acknowledgment</h3>
              <p className="text-gray-700 mb-4">
                By using LendenFF services, you acknowledge that you have read, understood, and agree to 
                be bound by this disclaimer.
              </p>
              <p className="text-gray-700">
                If you do not agree with any part of this disclaimer, you must immediately cease using 
                our services.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}