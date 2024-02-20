import { NextApiRequest, NextApiResponse } from "next";
import ServerAuth from "@/lib/ServerAuth";
import Prismadb from "@/lib/prismadb";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await ServerAuth(req);

    const favoriteMovies = await Prismadb.movie.findMany({
      where: {
        id: {
          in: currentUser?.favoriteIds,
        },
      },
    });

    return res.status(200).json(favoriteMovies);
  } catch (error) {
    console.log(error);
    res.status(400).end();
  }
};

export default handler;
