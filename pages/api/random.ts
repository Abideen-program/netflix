import { NextApiRequest, NextApiResponse } from "next";
import Prismadb from "@/lib/prismadb"; // Assuming this is your database module
import ServerAuth from "@/lib/ServerAuth"; // Assuming this is your server authentication module

// Define the API route handler function
const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Check if the HTTP request method is not "GET"
  if (req.method !== "GET") {
    // If not a GET request, return a 405 (Method Not Allowed) status code
    return res.status(405).end();
  }

  try {
    // Authenticate the server using ServerAuth module
    await ServerAuth(req);

    // Retrieve the total count of movies from the database
    const movieCount = await Prismadb.movie.count();

    // Generate a random index within the range of available movies
    const randomIndex = Math.floor(Math.random() * movieCount);

    // Retrieve a random movie from the database
    const randomMovies = await Prismadb.movie.findMany({
      take: 1, // Limit the result to one movie
      skip: randomIndex, // Skip randomIndex number of movies
    });

    // Return a 200 (OK) status code along with the randomly selected movie as JSON
    return res.status(200).json(randomMovies[0]);
  } catch (error) {
    // If an error occurs during execution, log the error
    console.log(error);
    // Return a 400 (Bad Request) status code
    return res.status(400).end();
  }
};

export default handler;
