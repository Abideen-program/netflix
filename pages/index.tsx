import useCurrentUser from "@/hook/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";

export default function Home() {
  const { data } = useCurrentUser();

  return (
    <>
      <h1 className="text-2xl text-green-500">NETFLIX CLONE</h1>

      <p className="text-white">Logged in as: {data?.name}</p>

      <button
        className="border border-green-500 w-full bg-white"
        onClick={() => signOut()}
      >
        Sign Out
      </button>
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
