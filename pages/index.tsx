import useCurrentUser from "@/hook/useCurrentUser";
import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

export default function Home() {

  return (
    <>
      
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
