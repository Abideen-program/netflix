import Image from "next/image";
import Logo from "../public/images/logo.png";

const Auth = () => {
  return (
    <div className="relative w-full h-full bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-12 py-5">
          <Image src={Logo} alt="LOGO" className="h-12 w-auto" />
        </nav>

        <div className="flex justify-center">
          <div className="border bg-black bg-opacity-75 mt-2 p-16 w-full lg:w-2/5 lg:max-w-md rounded-md">
            <h2 className="text-white text-4xl mb-8 font-medium">Sign in</h2>

            <div className="flex flex-col gap-4">
                
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
