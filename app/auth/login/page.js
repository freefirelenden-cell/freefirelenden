"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function LoginPage() {
  const { data: session, status } = useSession();

  useEffect(() => {
    // Agar login ho chuka hai to ek step piche bhej do
    if (status === "authenticated") {
      window.history.back();
    }
  }, [status]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm bg-white rounded-xl shadow p-6 text-center">
        <h1 className="text-2xl font-bold mb-2">Login</h1>
        <p className="text-gray-600 mb-6">Continue using your Google account</p>

        <button
          onClick={() => signIn("google")}
          className="w-full flex items-center justify-center gap-3 cursor-pointer border py-3 rounded-lg hover:bg-gray-50"
        >
          <img
            src="https://www.svgrepo.com/show/475656/google-color.svg"
            alt="Google"
            className="w-5 h-5"
          />
          <span className="font-medium">Continue with Google</span>
        </button>
      </div>
    </div>
  );
}
