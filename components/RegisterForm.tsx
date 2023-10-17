"use client";
import React, { FormEvent, SyntheticEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
interface IUser {
  name: string;
  email: string;
  password: string;
}
const RegisterForm = () => {
  const router = useRouter()
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    const { email, name, password } = user;
    if (!name || !email || !password) {
      setError("*All fields are required");
    }

    try {
      const resUserExist = await fetch("api/userexist", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const { user:userExist } = await resUserExist.json();
      if(userExist){
        setError('User already exist');
        return;
      }
     

      const res = await fetch("api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      if (res.ok) {
        setUser((prevState) => ({
          ...prevState,
          email: "",
          name: "",
          password: "",
        }));

      router.push('/')
      } else {
        console.log("User registration failed");
      }
    } catch (E) {
      console.log("Error during registration.", E);
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
            type='password'
            value={user.password}
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
