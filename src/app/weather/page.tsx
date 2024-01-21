"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { getWeather } from "@/lib/actions/getWeather";
import { ILocationObject, IWeatherData } from "@/lib/types";
import useLocalStorageState from "use-local-storage-state";
import { updateLocationArray } from "@/lib/utils";
import { CaretRightIcon } from "@radix-ui/react-icons";

export default function Home() {
  const { data } = useSession();
  const [location, setLocation] = useState<string>("");
  const [tempUnit, setTempUnit] = useState<"F" | "C">("C");
  const [weatherData, setWeatherData] = useState<IWeatherData["data"] | null>();
  const [error, setError] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);
  const [localStorageLocations, setLocalStorageLocations] =
    useLocalStorageState<ILocationObject[]>("saved-locations", {
      defaultValue: [],
    });

  const IsFormDisabled = !location || loading;
  const onTempSearchClick = async (inputLocation?: string) => {
    setLoading(true);
    setError("");
    const result = await getWeather(inputLocation ?? location);
    if (result.status == "data") {
      setWeatherData(result.data);
      setLocalStorageLocations(
        updateLocationArray(localStorageLocations, inputLocation ?? location)
      );
    } else {
      setError(result.error);
    }
    setLoading(false);
  };

  if (!data?.user) redirect("/");

  return (
    <div>
      <div className="flex flex-col justify-center  bg-white">
        <header className="flex items-center justify-between h-16 px-4 border-b bg-white">
          <h1 className="text-2xl font-bold">Weather App</h1>
          <Button onClick={() => signOut()}>Sign Out</Button>
        </header>
        <main className="flex-1 p-4">
          <div className="my-8">
            <Card>
              <CardHeader>
                <CardTitle>Weather Information</CardTitle>
              </CardHeader>

              <CardContent>
                <p className="text-gray-500">
                  Temperature:{" "}
                  {weatherData && !error
                    ? weatherData.temperature[tempUnit]
                    : "None"}
                </p>
                <p className="text-gray-500">
                  Wind Speed:{" "}
                  {weatherData?.wind && !error
                    ? weatherData.wind + "km/h"
                    : "None"}
                </p>
                <p className="text-gray-500">
                  Humidity:{" "}
                  {weatherData?.humidity && !error
                    ? weatherData?.humidity + "%"
                    : "None"}
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-md mx-auto space-y-8">
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Search for a location</h2>
              <form className="flex space-x-2">
                <Input
                  className="flex-1"
                  autoComplete="off"
                  onChange={(e) => setLocation(e.target.value)}
                  value={location}
                  placeholder="Enter a location"
                />
                <Button
                  onClick={() => onTempSearchClick()}
                  disabled={IsFormDisabled}
                >
                  {!loading ? "Search" : <Loader2 className="animate-spin" />}
                </Button>
              </form>
              <p className="text-red-600 text-sm">{error}</p>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Change units</h2>
              <div className="flex space-x-2">
                <Button
                  onClick={() => setTempUnit("C")}
                  disabled={IsFormDisabled}
                  variant={tempUnit == "C" ? "default" : "outline"}
                >
                  °C
                </Button>
                <Button
                  onClick={() => setTempUnit("F")}
                  disabled={IsFormDisabled}
                  variant={tempUnit == "F" ? "default" : "outline"}
                >
                  °F
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold">Last Few Saved locations...</h2>
              <div className="grid ">
                {!localStorageLocations.length && (
                  <p>Make a search and your history will appear here</p>
                )}
                {localStorageLocations.map((item) => (
                  <Button
                    onClick={() => {
                      setLocation(item.location);

                      onTempSearchClick(item.location);
                    }}
                    disabled={loading}
                    key={item.timestamp}
                    className="justify-between px-1 py-0 h-[2rem]  m-0"
                    variant="ghost"
                  >
                    {item.location} <CaretRightIcon className="size-6" />
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
