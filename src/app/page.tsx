"use client";
import { Button } from "@/components/ui/button";

import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Home() {
  const { data, status } = useSession();

  if (status === "loading")
    return (
      <main className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 sm:px-6 lg:px-8">
        <header className="flex items-center justify-between px-6 py-4 border-b">
          <h1 className="text-2xl font-bold">Weather App</h1>
        </header>
        <div className="flex items-center justify-center sm:mx-auto sm:w-full sm:max-w-md mt-4">
          <h2 className="flex items-center justify-center text-center font-extrabold text-gray-900">
            loading... please wait
          </h2>
        </div>
      </main>
    );
  if (status === "authenticated") {
    redirect("/weather");
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Weather App</h1>
      </header>
      <div className="sm:mx-auto sm:w-full sm:max-w-md mt-4">
        <div className="flex flex-col">
          <h2 className="text-center font-extrabold text-gray-900">
            Login with Different ways
          </h2>
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <Button
            onClick={() => signIn("google")}
            className="w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login With Google
          </Button>
          <Button
            asChild
            className="w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <Link className="text-blue-700" href={"login"}>
              Login with Password
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
