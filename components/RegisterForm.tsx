"use client";
import React, { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export interface IUser {
  name: string;
  email: string;
  password: string;
}
const RegisterForm = () => {
  const router = useRouter();
  const [user, setUser] = useState<IUser>({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { email, name, password } = user;
    if (!name || !email || !password) {
      setError("*All fields are required");
    }

    try {
      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      const jsonRes = await res.json();
      if (res.ok) {
        router.replace("/signin");
      } else {
        setError(jsonRes.error);
        console.log("User registration failed");
      }
    } catch (E) {
      console.log("Error during registration.", E);
    }
  };

  const [error, setError] = useState<string>("");
  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-start">
            <Link href="/home" className="flex ml-2 md:mr-24">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="FlowBite Logo"
              />
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                Assam Police
              </span>
            </Link>
          </div>
        </div>
      </nav>
      <div className="grid place-items-center h-screen">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-gray-400 ">
          <h1 className="text-xl font-bold my-4">Enter the details</h1>
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Full Name"
              name="name"
              value={user.name}
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Email"
              name="email"
              value={user.email}
              onChange={handleChange}
            />
            <input
              placeholder="Password"
              name="password"
              type="password"
              value={user.password}
              onChange={handleChange}
            />
            <button
              type="submit"
              className="bg-gray-600 text-white font-bold cursor-pointer px-5 py-2 rounded-lg hover:bg-gray-700 "
            >
              Register
            </button>
            {error && (
              <div className="bg-red-500 text-white w-fit rounded-md text-sm py-1 px-3 mt-2">
                {error}
              </div>
            )}
            <Link href={"/"} className="text-sm text-right cursor-pointer mt-3">
              Already have an account?<span className="underline">Login</span>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterForm;
