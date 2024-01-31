import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import prismadb from "@/lib/prismadb";
import { compare } from "bcrypt";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

export default NextAuth({
  // Define the authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },

      // Define the authorization logic
      async authorize(credentials) {
        // Validate that both email and password are provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and Password required");
        }

        // Retrieve the user from the database based on the provided email
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Check if the user exists and has a hashed password
        if (!user || !user.hashedPassword) {
          throw new Error("Email does not exist");
        }

        // Compare the provided password with the hashed password from the database
        const isCorrectPassword = await compare(
          credentials.password,
          user?.hashedPassword
        );

        // If the password is incorrect, throw an error
        if (!isCorrectPassword) {
          throw new Error("Incorrect Password");
        }

        // If all checks pass, return the user object
        return user;
      },
    }),
  ],

  // Configure authentication pages
  pages: {
    signIn: "/auth", // Redirect to "/auth" for sign-in
  },

  // Enable debugging in development mode
  debug: process.env.NODE_ENV === "development",

  adapter: PrismaAdapter(prismadb),

  // Configure session handling strategy
  session: {
    strategy: "jwt",
  },

  // Configure JSON Web Token (JWT)
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },

  // Configure a secret for NextAuth
  secret: process.env.NEXTAUTH_SECRET,
});
