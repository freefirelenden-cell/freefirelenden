"use client";

import { useEffect, useState } from "react";

export default function AboutPage() {
  const [contactInfo, setContactInfo] = useState({
    callNumber: "",
    messageNumber: "",
    whatsappNumber: "",
    supportEmail: "",
    easypaisaNumber: "",
    jazzcashNumber: "",
    accountCommission: "",
    topupCommission: ""
  });

  useEffect(() => {
    // Load contact info from environment variables
    setContactInfo({
      callNumber: process.env.NEXT_PUBLIC_CALL_NUMBER,
      messageNumber: process.env.NEXT_PUBLIC_MESSAGE_NUMBER,
      whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER,
      supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL,
      easypaisaNumber: process.env.NEXT_PUBLIC_EASYPAISA_NUMBER,
      jazzcashNumber: process.env.NEXT_PUBLIC_JAZZCASH_NUMBER,
      accountCommission: process.env.NEXT_PUBLIC_COMMISSION_PAR_ACCOUNT || "1",
      topupCommission: process.env.NEXT_PUBLIC_COMMISSION_PAR_TOPUP || "1"
    });
  }, []);

  const team = [
    {
      name: "Muhammad Ali",
      role: "Founder & CEO",
      bio: "Passionate gamer and entrepreneur with 5+ years in gaming industry",
      image: "👨‍💼"
    },
    {
      name: "Sarah Khan",
      role: "Head of Operations",
      bio: "Expert in digital marketplace management and customer service",
      image: "👩‍💼"
    },
    {
      name: "Ahmed Raza",
      role: "Tech Lead",
      bio: "Full-stack developer specializing in secure transaction systems",
      image: "👨‍💻"
    },
    {
      name: "Fatima Noor",
      role: "Customer Support",
      bio: "Dedicated to providing 24/7 support to our gaming community",
      image: "👩‍💬"
    }
  ];

  const milestones = [
    { year: "2023", event: "LendenFF Founded", description: "Started with a vision to create safe marketplace" },
    { year: "2024", event: "1000+ Users", description: "Reached milestone of 1000 registered users" },
    { year: "2024", event: "500+ Successful Deals", description: "Completed over 500 secure transactions" },
    { year: "2024", event: "24/7 Support Launch", description: "Started round-the-clock customer support" }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About LendenFF</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            {`Pakistan's most trusted Free Fire account marketplace. We're dedicated to providing safe, fast, 
            and reliable services to the Pakistani gaming community.`}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Our Story */}
        <div className="bg-white rounded-xl shadow-sm border p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
          <div className="prose max-w-none text-gray-700">
            <p className="mb-4">
              LendenFF was born from a simple idea: to create a safe and reliable marketplace for Free Fire players 
              in Pakistan. As avid gamers ourselves, we experienced firsthand the risks of account trading on 
              unverified platforms.
            </p>
            <p className="mb-4">
             {` In 2023, we decided to build a solution that would eliminate scams and provide a seamless experience 
              for both buyers and sellers. Today, we're proud to be Pakistan's fastest-growing Free Fire marketplace, 
              serving thousands of players with secure transactions and instant delivery.`}
            </p>
            <p>
              Our mission is to build trust in the gaming community by providing verified sellers, secure payment 
              processing, and 24/7 customer support.
            </p>
          </div>
        </div>

        {/* Milestones */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Journey</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {milestones.map((milestone, index) => (
              <div key={index} className="bg-white border rounded-xl p-6 text-center">
                <div className="text-4xl font-bold text-blue-600 mb-2">{milestone.year}</div>
                <h3 className="text-lg font-bold mb-2">{milestone.event}</h3>
                <p className="text-gray-600">{milestone.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Meet Our Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <div key={index} className="bg-white border rounded-xl p-6 text-center">
                <div className="text-6xl mb-4">{member.image}</div>
                <h3 className="text-xl font-bold mb-2">{member.name}</h3>
                <div className="text-blue-600 font-medium mb-3">{member.role}</div>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Values */}
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-8 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Security First</h3>
              <p className="text-gray-700">
                Every transaction is protected with multiple verification layers and secure payment processing.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold mb-3">Speed & Efficiency</h3>
              <p className="text-gray-700">
                Instant delivery and quick support response times to ensure the best user experience.
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-3">Community Trust</h3>
              <p className="text-gray-700">
                Building lasting relationships with our users through transparency and reliability.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-blue-50 p-6 rounded-xl">
              <div className="text-3xl mb-4">📞</div>
              <h3 className="font-bold mb-2">Call Us</h3>
              <p className="text-blue-600 font-medium">{contactInfo.callNumber}</p>
            </div>
            <div className="bg-green-50 p-6 rounded-xl">
              <div className="text-3xl mb-4">💬</div>
              <h3 className="font-bold mb-2">WhatsApp</h3>
              <p className="text-green-600 font-medium">{contactInfo.whatsappNumber}</p>
            </div>
            <div className="bg-purple-50 p-6 rounded-xl">
              <div className="text-3xl mb-4">📧</div>
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-purple-600 font-medium">{contactInfo.supportEmail}</p>
            </div>
            <div className="bg-yellow-50 p-6 rounded-xl">
              <div className="text-3xl mb-4">💳</div>
              <h3 className="font-bold mb-2">Payment Numbers</h3>
              <p className="text-yellow-600 font-medium">
                JazzCash: {contactInfo.jazzcashNumber}<br/>
                EasyPaisa: {contactInfo.easypaisaNumber}
              </p>
            </div>
          </div>

          {/* Commission Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-xl font-bold mb-4">Transparent Commission Structure</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Account Sales Commission</span>
                  <span className="font-bold text-blue-600">{contactInfo.accountCommission}%</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Lowest in Pakistan - only {contactInfo.accountCommission}% per successful account sale</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <span>Top-Up Commission</span>
                  <span className="font-bold text-purple-600">{contactInfo.topupCommission}%</span>
                </div>
                <p className="text-sm text-gray-600 mt-2">Only {contactInfo.topupCommission}% commission on diamond recharge orders</p>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-6 bg-yellow-50 border border-yellow-200 rounded-xl">
          <h3 className="font-bold text-yellow-800 mb-2">⚠️ Important Notice</h3>
          <p className="text-yellow-700">
            LendenFF is an independent marketplace and is not affiliated with, endorsed by, or connected to Garena Free Fire 
            or its parent company. We provide a platform for players to trade accounts safely within the game's terms of service.
          </p>
        </div>
      </div>
    </div>
  );
}