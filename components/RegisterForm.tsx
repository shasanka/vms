"use client";
import React, { useState } from "react";
import Link from "next/link";
interface IUser {
  name: string;
  email: string;
  password: string;
}
const RegisterForm = () => {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const { email, name, password } = user;
    if (!name || !email || !password) {
      setError("*All fields are required");
    }
  };

  const [error, setError] = useState<string>("");
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Enter the details</h1>
        <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={handleChange}
          />
          <input
            type="text"
            placeholder="Password"
            name="password"
            onChange={handleChange}
          />
          <button
            type="submit"
            className="bg-green-600 text-white font-bold cursor-pointer px-5 py-2 rounded-lg hover:bg-green-700 "
          >
            Register
          </button>
          {error && (
            <div className="bg-red-500 px-2 text-white w-fit rounded-md text-sm py-1 px-3 mt-2">
              {error}
            </div>
          )}
          <Link href={"/"} className="text-sm text-right cursor-pointer mt-3">
            Already have an account?<span className="underline">Login</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
