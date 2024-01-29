import { NextApiRequest, NextApiResponse } from "next";
import prismadb from "@/lib/prismadb";
import { hash } from "bcrypt";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the HTTP request method is not "POST"
  if (req.method !== "POST") {
    return res.status(405).end();
  }

  try {
    const { name, email, password } = req.body;

    // Query the database to check if a user with the given email already exists
    const existingUser = await prismadb.user.findUnique({
      where: {
        email,
      },
    });

    // If the user with the email already exists, return a 422 status and a JSON message
    if (existingUser) {
      return res.status(422).json({ success: false, message: "Email Taken" });
    }

    // Hash the user's password using bcrypt
    const hashedPassword = await hash(password, 12);

    // Create a new user in the database
    const user = prismadb.user.create({
      data: {
        email,
        name,
        hashedPassword,
        image: "",
        emailVerified: new Date(),
      },
    });

    return res.status(200).json({ success: true, data: user });
  } catch (error) {
    console.log(error);

    // Return a generic error response to the client
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default handler;
