import { NextApiRequest } from "next";
import prismadb from "@/lib/prismadb";
import { getSession } from "next-auth/react";

// ServerAuth function for server-side authentication in a Next.js API route
const ServerAuth = async (req: NextApiRequest) => {
  // Retrieve user session information using NextAuth.js
  const session = await getSession({ req });

  // Check if a valid session exists and if the user's email is available
  if (!session?.user?.email) {
    // If not, throw an error indicating the user is not signed in
    throw new Error("Not signed in");
  }

  // Query the database to find the user based on the email from the session
  const currentUser = await prismadb.user.findUnique({
    where: {
      email: session?.user?.email,
    },
  });

  // If the user is not found in the database, throw an error
  if (!currentUser) {
    throw new Error("Not signed in");
  }

  // If the user is authenticated and found in the database, return user information
  return { currentUser };
};

export default ServerAuth;
