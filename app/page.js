"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Dashboard from "./gallery/page";

export default function Home() {
  const [login, setLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    const form = new FormData(e.target);
    const { email, password } = Object.fromEntries(form.entries());
    console.log(email, password);
  };
  return (
    <main className="flex min-h-screen items-center justify-between p-3 sm:p-24 flex-wrap">
      <div></div>
      <div className="w-full max-w-[500px] h-full flex flex-col gap-6 justify-center items-center py-10 px-3 border-2 border-solid border-green-300">
        <h1 className="text-2xl ">{login ? "Login" : "Register"}</h1>
        <form
          className="flex flex-col gap-3 w-full max-w-[500px] justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-3 py-2 rounded-md"
            name="email"
            type="email"
            required
            placeholder="Email"
          />
          <input
            className="w-full px-3 py-2 rounded-md"
            name="password"
            type="password"
            required
            placeholder="password"
          />
          <div className="flex gap-4 mt-3">
            <button
              className="w-[100px] h-10 flex justify-center items-center rounded-md bg-slate-50"
              type="submit"
            >
              {login ? (
                <p>{!loading ? "Login" : "Loggin in..."}</p>
              ) : (
                <p>{!loading ? "Register" : "Registering..."}</p>
              )}
            </button>
            <button
              className="w-[100px] h-10 flex justify-center items-center rounded-md bg-slate-300 text-green-600"
              type="button"
            >
              Google
            </button>
          </div>
        </form>
        {login ? (
          <p>
            Don't have an account?{" "}
            <span
              className="cursor-pointer text-green-700"
              onClick={() => setLogin((prev) => !prev)}
            >
              Sign up
            </span>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <span
              className="cursor-pointer text-green-700"
              onClick={() => setLogin((prev) => !prev)}
            >
              Sign in{" "}
            </span>
          </p>
        )}
      </div>
      <Dashboard />
    </main>
  );
}
