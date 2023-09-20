"use client";
import { useState } from "react";
import { auth } from "@/service/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = new FormData(e.target);
    const { email, password } = Object.fromEntries(form.entries());
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      if (user) {
        router.push("/gallery");
      }
    } catch (error) {
      console.log(error.message);
      setError("Invalid login parameters");
    } finally {
      setLoading(false);
    }
  };
  return (
    <main className="flex min-h-screen items-center justify-between p-3 sm:p-24 flex-wrap">
      {/* <div></div> */}
      <div className="w-full max-w-[500px] h-full flex flex-col gap-6 justify-center items-center py-10 px-3 border-2 border-solid border-green-300">
        <h1 className="text-2xl ">Login</h1>
        <form
          className="flex flex-col gap-3 w-full max-w-[500px] justify-center items-center"
          onSubmit={handleSubmit}
        >
          <input
            className="w-full px-3 py-2 rounded-md"
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <input
            className="w-full px-3 py-2 rounded-md"
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <div className="flex gap-4 mt-3">
            <button
              className="w-[100px] h-10 flex justify-center items-center rounded-md bg-slate-50 text-green-600"
              type="submit"
            >
              <p>{!loading ? "Login" : "Loggin in..."}</p>
            </button>
          </div>
        </form>
        {error && <p className="text-red-400 text-center">{error}</p>}
        <div className="w-full flex flex-col gap-2 p-2">
          <p>Default login parameters are:</p>
          <p>
            Email:
            <span
              className="cursor-pointer text-green-700 ml-1"
              onClick={() => setEmail("user@example.com")}
            >
              user@example.com
            </span>
          </p>
          <p>
            Password:
            <span
              className="cursor-pointer text-green-700 ml-1"
              onClick={() => setPassword("1Password")}
            >
              1Password
            </span>
          </p>
        </div>
      </div>
    </main>
  );
}
