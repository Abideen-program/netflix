import useCurrentUser from "@/hook/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import { isEmpty } from "lodash";

import Navbar from "@/components/Navbar";
import Billboard from "@/components/Billboard";
import MoviesList from "../components/MoviesList";
import useMoviesList from "@/hook/useMoviesList";

export default function Home() {
  const { data: movies = [1,2,3,4] } = useMoviesList();

  return (
    <>
      <Navbar />
      <Billboard />
      <div className={`${isEmpty(movies) ? '' : 'pb-40'}`}>
        <MoviesList title="Trending Now" data={movies} />
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
