import { NextApiRequest, NextApiResponse } from "next";
import { without } from "lodash";

import Prismadb from "@/lib/prismadb";
import ServerAuth from "@/lib/ServerAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method == "POST") {
      const { currentUser } = await ServerAuth(req);
      const { movieId } = req.body;

      const existingMovie = await Prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const user = await Prismadb.user.update({
        where: {
          email: currentUser?.email,
        },
        data: {
          favoriteIds: {
            push: movieId,
          },
        },
      });

      return res.status(200).json(user);
    }

    if (req.method === "DELETE") {
      const { currentUser } = await ServerAuth(req);
      const { movieId } = req.body;

      const existingMovie = await Prismadb.movie.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new Error("Invalid ID");
      }

      const updatedFavoriteIds = without(currentUser?.favoriteIds, movieId);

      const user = await Prismadb.user.update({
        where: {
          email: currentUser?.email,
        },
        data: {
          favoriteIds: updatedFavoriteIds,
        },
      });

      return res.status(200).json(user);
    }

    return res.status(405).end();
  } catch (error) {
    res.status(400).end();
  }
};

export default handler;
