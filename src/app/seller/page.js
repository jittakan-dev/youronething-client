"use client";
import React, { useState } from "react";
import Router from "next/router";
import Link from "next/link";
const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    //Router.push("/dashboard");
  };
  return (
    <div className="flex flex-col justify-start items-center w-full min-h-screen h-auto px-0 sx:px-6 2xl:px-0 pt-24 mb-10">
      <div className="flex flex-col justify-center items-center w-1/2 sx:w-full">
        <h1 className="text-2xl mb-6 font-semibold">Seller Login</h1>
        <p className="w-1/2 sx:w-full mb-4">
          Login as a seller before you can sell your exquisite
          products/services.
        </p>
        <form onSubmit={handleSubmit} className="w-1/2 sx:w-full">
          <div className="flex flex-col justify-center item-center w-full">
            <input
              className="border py-2 px-3 mb-4 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border py-2 px-3 mb-4 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end items-center py-2 mb-4 w-full text-sm cursor-pointer">
              <span>Forgot password?</span>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col justify-center items-center w-full">
        <div className="flex flex-col justify-center items-center w-1/2 sx:w-full">
          <div className="flex flex-col justify-center items-center w-full">
            <div className="m-3 text-lg">Or</div>
            <button className="w-2/4 sx:w-full p-2 mb-4 text-lg cursor-pointer border-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
              Sign in with Google
            </button>
            <button className="w-2/4 sx:w-full p-2 mb-4 text-lg cursor-pointer border-2 text-blue-500 border-blue-500 hover:bg-blue-500 hover:text-white">
              Sign in with Microsoft
            </button>
          </div>
          <span className="text-lg mb-4">Do not have an account?</span>
          <Link
            href="/seller/signup"
            className="w-1/2 sx:w-full p-2 text-xl text-center cursor-pointer border-2 text-green-700 border-green-700 hover:bg-green-700 hover:text-white"
          >
            Register Seller
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;
