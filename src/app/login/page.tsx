"use client";
import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { redirect, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { Loader2 } from "lucide-react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { data } = useSession();

  if (data?.user) {
    return redirect("/weather");
  }

  const handleLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        redirect: true,
        email,
        password,
      });

      if (result?.error) {
        setError(result?.error);
      }
    } catch (err) {
      console.log("ERROR", err);
      setError("Error, please try again");
      setLoading(false);
    }
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen py-6 bg-gray-50 sm:px-6 lg:px-8">
      <header className="flex items-center justify-between px-6 py-4 border-b">
        <h1 className="text-2xl font-bold">Weather App</h1>
      </header>
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Login to your account
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6" method="POST">
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="email"
              >
                Email address
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="email"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  id="email"
                  name="email"
                  required
                  // type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <Label
                className="block text-sm font-medium text-gray-700"
                htmlFor="password"
              >
                Password
              </Label>
              <div className="mt-1">
                <Input
                  autoComplete="current-password"
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm "
                  id="password"
                  name="password"
                  required
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>

            {error && <p className="text-red-600 text-sm my-2">{error}</p>}
            <div>
              <Button
                className={`disabled:opacity-70 w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}
                type="submit"
                disabled={loading}
              >
                {!loading ? "Login" : <Loader2 className="animate-spin" />}
              </Button>
            </div>
          </form>

          <div className="mt-6 flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">
              Or continue with{" "}
              <Link className="text-blue-700" href={"signup"}>
                Signup
              </Link>
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
