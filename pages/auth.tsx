import Image from "next/image";
import Logo from "../public/images/logo.png";
import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  const login = useCallback(async () => {
    console.log("Login");
  }, []);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        name,
        email,
        password,
      });
    } catch (error) {
      console.log(error);
    }
  }, [name, email, password]);

  return (
    <div className="relative w-full h-fit 2xl:h-full  bg-[url('/images/hero.jpg')] bg-fixed bg-no-repeat bg-center bg-cover">
      <div className="w-full h-full bg-black lg:bg-opacity-50">
        <nav className="px-7 md:px-12 py-5">
          <Image src={Logo} alt="LOGO" className="h-8 md:h-12 w-auto" />
        </nav>

        <div className="flex justify-center">
          <div className="bg-black bg-opacity-75 mt-2 p-7 md:p-16 w-full lg:w-2/5 lg:max-w-md rounded-md mb-5">
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

              <p className="text-neutral-500 mt-6 text-sm md:text-base">
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
