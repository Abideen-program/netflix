import { NextPageContext } from "next";
import { getSession } from "next-auth/react";

const Profile = () => {
  return <div className="text-white text-2xl">Profile</div>;
};

export default Profile;

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
