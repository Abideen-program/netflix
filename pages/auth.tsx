import Image from "next/image";
import Logo from "../public/images/logo.png";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");
  const router = useRouter();

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  //Login logic
  const login = useCallback(async () => {
    try {
      const login = await signIn("credentials", {
        email,
        password,
        redirect: false,
        callbackUrl: "/",
      });

      //check if the signin call is ok
      if (login?.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }, [email, password, router]);

  //Register Logic
  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password]);

  return (
    <div className="relative w-full h-full xl:h-full  bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-7 md:px-12 py-5">
          <Image src={Logo} alt="LOGO" className="h-8 md:h-12 w-auto" />
        </nav>

        <div className="flex justify-center border">
          <div className="bg-black bg-opacity-75 mt-1 p-7 md:p-10 w-full lg:w-2/5 lg:max-w-md rounded-md mb-5">
            <h2 className="text-white text-3xl md:text-4xl mb-8 font-medium">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>

            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  onChange={(e: any) => setName(e.target.value)}
                  id="name"
                  value={name}
                  label="Username"
                  type="text"
                />
              )}
              <Input
                onChange={(e: any) => setEmail(e.target.value)}
                id="email"
                value={email}
                label="Email"
                type="email"
              />
              <Input
                onChange={(e: any) => setPassword(e.target.value)}
                id="password"
                value={password}
                label="Password"
                type="password"
              />

              <button
                onClick={variant === "login" ? login : register}
                className="bg-red-600 py-3 text-white rounded-md hover:bg-red-700 transition w-full mt-7"
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>

              <div className="flex flex-row items-center justify-center gap-4">
                <div
                  onClick={() => signIn("google", { callbackUrl: "/" })}
                  className="w-10 h-10 bg-white hover:opacity-80 rounded-full cursor-pointer transition flex items-center justify-center"
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  onClick={() => signIn("github", { callbackUrl: "/" })}
                  className="w-10 h-10 bg-white hover:opacity-80 rounded-full cursor-pointer transition flex items-center justify-center"
                >
                  <FaGithub size={30} />
                </div>
              </div>

              <p className="text-neutral-500 mt-4 text-sm md:text-base">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an account"}{" "}
                <span
                  onClick={toggleVariant}
                  className="text-white hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an Account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
