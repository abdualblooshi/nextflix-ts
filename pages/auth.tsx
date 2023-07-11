import { useCallback, useState, useEffect } from "react";
import { motion } from "framer-motion";
import Input from "@/components/input";
import axios from "axios";
import Image from "next/image";
import Message from "@/components/message";
import { useRecoilState } from "recoil";
import { isVisibleState, messageState, statusState } from "@/libs/message";
import { useRouter } from "next/router";
import { signIn } from "next-auth/react";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [variant, setVariant] = useState("login");
  const toggleVariant = useCallback(() => {
    setVariant((prev) => (prev === "login" ? "register" : "login"));
  }, []);

  const [messageVisible, setMessageVisible] = useRecoilState(isVisibleState);
  const [message, setMessage] = useRecoilState(messageState);
  const [status, setStatus] = useRecoilState(statusState);
  const [ipAddress, setIpAddress] = useState("");

  const router = useRouter();

  const getIpAddress = useCallback(async () => {
    try {
      const { data } = await axios.get("https://api.ipify.org?format=json");
      setIpAddress(data?.ip);
    } catch (error) {
      console.log(error);
    }
  }, [setIpAddress]);

  const login = useCallback(async () => {
    setMessageVisible(false);
    try {
      const { data } = await axios.post("/api/login", {
        email: "+971501234123",
        password: "password",
      });

      console.log(data);

      setMessage(data?.message);
      setStatus("success");
      setMessageVisible(true);
      setTimeout(() => {
        setMessageVisible(false);
      }, 1500);

      await signIn("credentials", {
        email: data?.user.email,
        password: "password",
        callbackUrl: "/profiles",
      });
    } catch (error: any) {
      console.log(error);
      setMessage(
        error?.response ? error?.response?.data?.error : error?.message
      );
      setStatus("error");
      setMessageVisible(true);
    }
  }, [setMessage, setStatus, setMessageVisible]);

  // Disabled register since this is a production demo app
  /*const register = useCallback(async () => {
    setMessageVisible(false);
    try {
      await getIpAddress();
      const { data } = await axios.post("/api/register", {
        firstName,
        lastName,
        email,
        phone,
        password,
        ipAddress,
      });
      console.log(data);
      setMessage(data?.message);
      setStatus("success");
      setMessageVisible(true);

      // clear fields and redirect to login
      setFirstName("");
      setLastname("");
      setEmail("");
      setPhone("");
      setPassword("");
      login();
    } catch (error: any) {
      console.log(error);
      setMessage(error?.response.data.error);
      setStatus("error");
      setMessageVisible(true);
    }
  }, [
    email,
    phone,
    password,
    setMessage,
    setStatus,
    setMessageVisible,
    ipAddress,
    getIpAddress,
    login,
    firstName,
    lastName,
  ]);*/

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-cover">
      <div className="bg-black w-full h-full lg:bg-opacity-50">
        <nav className="flex items-center justify-between lg:p-6 pt-4 px-4">
          <div className="flex justify-center items-center">
            <Image
              alt="Nextflix Logo"
              src={"/images/nextflix-text.png"}
              className="w-44"
              width={500}
              height={50}
            />
          </div>
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 p-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-4xl text-white font-semibold mb-8">
              {variant === "login" ? "Sign In" : "Register"}
            </h2>
            <p className="text-white mb-4">
              (Registration is disabled. Press sign in)
            </p>
            <form
              className="flex flex-col gap-4"
              onSubmit={(e) => e.preventDefault()}
              autoComplete="off"
            >
              {variant === "register" && (
                <>
                  <div className="flex lg:flex-row gap-4 w-full flex-col">
                    <Input
                      id="firstName"
                      label="First name"
                      type="text"
                      value={firstName}
                      onChange={(e: any) => setFirstName(e.target.value)}
                    />
                    <Input
                      id="lastName"
                      label="Last name"
                      type="text"
                      value={lastName}
                      onChange={(e: any) => setLastname(e.target.value)}
                    />
                  </div>
                  <Input
                    id="phone"
                    label="Phone number (E.g +97150...)"
                    type="tel"
                    value={phone}
                    onChange={(e: any) => setPhone(e.target.value)}
                  />
                </>
              )}
              <Input
                id="email"
                type="email"
                label={
                  variant === "login"
                    ? "Email or phone number"
                    : "Email address"
                }
                value="johndoe@nextflix.com"
                onChange={(e: any) => setEmail("johndoe@nextflix.com")}
              />
              <Input
                id="password"
                type="password"
                label="Password"
                value="password"
                onChange={(e: any) => setPassword("password")}
              />
              <button
                onClick={variant === "login" ? login : login}
                className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition"
              >
                {variant === "login" ? "Sign In" : "Register"}
              </button>

              <p className="text-neutral-500 mt-12 text-center">
                {variant === "login"
                  ? "First time using Netflix?"
                  : "Already have an account?"}
                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Sign In"}
                </span>
                .
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
