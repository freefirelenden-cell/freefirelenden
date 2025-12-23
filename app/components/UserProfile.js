"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function UserProfile({ showName = false }) {
  const { data: session, status } = useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  if (status === "loading") return null;

  // Google Login
  const handleSignIn = () => {
    signIn("google");
  };

  // Logout
  const handleLogout = () => {
    signOut();
    setDropdownOpen(false);
  };

  return (
    <div className=" items-center">
      {!session ? (
        // NOT LOGGED IN
        <button
          onClick={handleSignIn}
          className="px-6 py-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white rounded-lg font-medium hover:shadow-lg"
        >
          Sign Up
        </button>
      ) : (
        // LOGGED IN
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex items-center gap-2 bg-gray-100   rounded-full hover:bg-gray-200 cursor-pointer`}
          >
            <Image
              src={session.user.image}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full"
            />

            {showName && (
              <span className="text-gray-700 text-sm">
                {session.user.name}
              </span>
            )}
            {/* Arrow Icon */}
            <svg
              className={`w-4 h-4 transform transition-transform duration-300 ${dropdownOpen ? "rotate-180 text-gray-600" : "rotate-0 text-gray-400"
                }`}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg transition-opacity duration-300 opacity-100">
              <ul className="text-sm">
                <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                  {session.user.email}
                </li>
                <li
                  onClick={handleLogout}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
