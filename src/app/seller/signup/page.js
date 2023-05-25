"use client";
import React, { useState } from "react";
import Router from "next/router";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [accepted, setAccepted] = useState(false);

  const handleCheckboxChange = (event) => {
    setAccepted(event.target.checked);
  };

  const handleSignUp = () => {
    if (accepted) {
      console.log("User signed up successfully!");
    } else {
      console.log("Please accept the Terms of Service and Privacy Policy.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Router.push("/dashboard");
  };
  return (
    <div className="flex flex-col justify-start items-center w-full h-screen px-0 sx:px-6 2xl:px-0 pt-24  mb-10">
      <div className="flex flex-col justify-center items-center w-1/2 sx:w-full">
        <h1 className="text-2xl mb-6 font-semibold">Seller Sign Up</h1>
        <p className="w-1/2 sx:w-full mb-4">Seller registration.</p>
        <form onSubmit={handleSubmit} className="w-1/2 sx:w-full">
          <div className="flex flex-col justify-center item-center w-full">
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="text"
              placeholder="Full Name"
              value={email}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              className="border rounded py-2 px-3 mb-2 w-full"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex justify-end items-center py-2 mb-4 w-full text-sm">
              <input
                type="checkbox"
                checked={accepted}
                onChange={handleCheckboxChange}
                className="p-1 m-1 sx:m-2"
              />
              <span className="p-2 pl-3 border-2 border-l-slate-600">
                By signing up you accept the Term of service and Privacy policy
              </span>
            </div>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 "
              type="submit"
              onClick={handleSignUp}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
