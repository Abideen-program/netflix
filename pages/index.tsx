import useCurrentUser from "@/hook/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MoviesList from "./MoviesList";

export default function Home() {
  return (
    <>
      <Navbar />
      <Billboard />
      <div>
        <MoviesList />
      </div>
    </>
  );
}

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
