import GoogleProvider from "next-auth/providers/google";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  callbacks: {
    // JWT me sirf basic info store karenge
    async jwt({ token, user, account }) {
      if (user) {
        token.sub = user.id; // Google ID
        // DB se role fetch karlo
        await connectDB();
        const dbUser = await User.findOne({ authId: user.id });
        if (dbUser) {
          token.role = dbUser.role; // ← middleware ke liye yeh zaruri
        }
      }
      return token;
    },


    // Session me har baar DB se fresh data fetch karenge
    async session({ session, token }) {
      await connectDB();
      const dbUser = await User.findOne({ authId: token.sub });

      if (dbUser) {
        session.user._id = dbUser._id.toString();
        session.user.email = dbUser.email;
        session.user.name = dbUser.name;
        session.user.image = dbUser.image;
        session.user.role = dbUser.role;
        session.user.phone = dbUser.phone || "";
        session.user.isUserExistInDB = true;
      } else {
        session.user.isUserExistInDB = false;
      }

      return session;
    },
  },
};
