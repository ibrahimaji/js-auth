"use client";
import Link from "next/link";
import { useLogin } from "@/app/hooks/useLogin";

export const Login = () => {
  const { error, loginData, handleEventChange, handleSubmit } = useLogin();
  return (
    <div className="grid place-items-center h-screen">
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold my-4">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input onChange={handleEventChange} type="text" placeholder="Email" />
          <input
            onChange={handleEventChange}
            type="password"
            placeholder="Password"
          />
          <button className="bg-green-600 text-white font-bold cursor-pointer px-6 py-2">
            Login
          </button>
          {error && (
            <div className="bg-red-500 text-white w-fit text-sm py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <Link className="text-sm mt-3 text-right" href={"/auth/register"}>
            Don&apos;t have an account?{" "}
            <span className="underline">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};
