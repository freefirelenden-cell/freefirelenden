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
    // 🔹 JWT CALLBACK (LOGIN TIME)
    async jwt({ token, user }) {
      if (user) {
        await connectDB();

        // 🔍 user DB me check karo
        let dbUser = await User.findOne({ authId: user.id });

        // 🆕 agar naya user hai → CREATE
        if (!dbUser) {
          dbUser = await User.create({
            authId: user.id,
            name: user.name,
            email: user.email,
            image: user.image,
            role: "user",
          });
        }

        // token me DB data store karo
        token.sub = dbUser.authId;
        token.role = dbUser.role;
      }

      return token;
    },

    // 🔹 SESSION CALLBACK (HAR REQUEST PAR)
    async session({ session, token }) {
      await connectDB();

      const dbUser = await User.findOne({ authId: token.sub });

      if (dbUser) {
        session.user._id = dbUser._id.toString();
        session.user.name = dbUser.name;
        session.user.email = dbUser.email;
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
