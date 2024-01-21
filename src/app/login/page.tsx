import Link from "next/link";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function Home() {
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
          <form action="#" className="space-y-6" method="POST">
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
                  type="email"
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
                />
              </div>
            </div>
            <div>
              <Button
                className="w-full flex justify-center py-2 px-4 border border-gray-200 border-transparent rounded-md shadow-sm text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Login
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
