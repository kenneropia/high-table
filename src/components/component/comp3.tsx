import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function Comp3() {
  return (
    <div className="flex flex-col h-screen bg-white">
      <header className="flex items-center h-16 px-4 border-b bg-white">
        <h1 className="text-2xl font-bold">Weather App</h1>
        <nav className="ml-auto flex gap-4">
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Sign Up
          </Link>
          <Link
            className="text-sm font-medium hover:underline underline-offset-4"
            href="#"
          >
            Login
          </Link>
        </nav>
      </header>
      <main className="flex-1 p-4">
        <div className="max-w-md mx-auto space-y-8">
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Search for a location</h2>
            <div className="flex space-x-2">
              <Input
                className="flex-1"
                id="search"
                placeholder="Enter a location"
              />
              <Button>Search</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Change units</h2>
            <div className="flex space-x-2">
              <Button variant="outline">°C</Button>
              <Button variant="outline">°F</Button>
            </div>
          </div>
          <div className="space-y-2">
            <h2 className="text-xl font-bold">Saved locations</h2>
            <div className="grid gap-2">
              <Button className="justify-start" variant="ghost">
                New York, USA
              </Button>
              <Button className="justify-start" variant="ghost">
                London, UK
              </Button>
              <Button className="justify-start" variant="ghost">
                Tokyo, Japan
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
