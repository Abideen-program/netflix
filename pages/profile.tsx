import { NextPageContext } from "next";
import { getSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";

import ProfileImage from "../public/images/default-blue.png";
import useCurrentUser from "@/hook/useCurrentUser";

const Profile = () => {
  const { data: user } = useCurrentUser();
  const router = useRouter();

  return (
    <div className="flex items-center justify-center h-full">
      <div className="flex flex-col">
        <h1 className="text-white text-3xl md:text-6xl text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <div onClick={() => router.push("/")}>
            <div className="group flex flex-col w-44 mx-auto">
              <div className="border-2 border-transparent w-44 h-44 rounded-md flex items-center justify-center group-hover:border-white group-hover:cursor-pointer overflow-hidden">
                <Image src={ProfileImage} alt="profile" />
              </div>

              <div className="mt-4 flex items-center justify-center text-center text-gray-400 text-2xl group-hover:text-white transition capitalize">
                {user?.name}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
