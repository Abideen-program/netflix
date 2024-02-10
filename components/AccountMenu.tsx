import { signOut } from "next-auth/react";
import Image from "next/image";

import ProfileImage from "../public/images/default-blue.png";

interface AccountMenuProps {
  visible: boolean;
}

const AccountMenu = ({ visible }: AccountMenuProps) => {
  if (!visible) {
    return null;
  }

  return (
    <div className="bg-black w-56 border-2 border-gray-800 py-5 absolute top-14 right-0">
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex flex-row gap-3 items-center w-full">
          <Image
            src={ProfileImage}
            alt="Profile"
            className="w-8 h-8 rounded-md"
          />
          <p className="text-white text-sm group-hover/item:underline">
            Username
          </p>
        </div>

        <hr className="my-3 border-0 bg-gray-600 h-px" />

        <div className="px-3" onClick={() => signOut()}>
          <p className="text-white text-sm text-center hover:underline">
            Sign out of Netflix
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
