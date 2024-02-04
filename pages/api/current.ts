import { NextApiRequest, NextApiResponse } from "next";
import ServerAuth from "@/lib/ServerAuth";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    return res.status(405).end();
  }

  try {
    const { currentUser } = await ServerAuth(req);
    return res.status(200).json(currentUser);
  } catch (error) {
    console.log(error);
    return res.status(400).end();
  }
};

export default handler;
