"use server";

import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { IWeatherData } from "../types";

export async function getWeather(
  location: string
): Promise<IWeatherData | { status: "error"; error: string }> {
  const user = await getServerSession();
  if (!user?.user) {
    redirect("/");
  }

  const tempObj: Record<any, any> = {};
  const apiKey = process.env.OPEN_WEATHER_API;

  try {
    const pointsUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&limit=1&appid=${apiKey}&units=metric`;

    const locationRes = await fetch(pointsUrl, {
      next: { revalidate: 10000, tags: [location] },
    });
    const temp = await locationRes.json();

    if (locationRes.ok) {
      tempObj.temperatureCelsius = temp.main.temp;
      tempObj.humidity = temp.main.humidity;

      tempObj.temperatureFahrenheit = (9 / 5) * tempObj.temperatureCelsius!;
      tempObj.temperatureFahrenheit += 32;
      return {
        status: "data",
        data: {
          wind: temp.wind.speed!,
          description: temp.weather[0].description,
          humidity: temp.main.humidity!,
          temperature: {
            C: +tempObj.temperatureCelsius!.toFixed(2),
            F: +tempObj.temperatureFahrenheit!.toFixed(2),
          },
        },
      };
    } else {
      console.log(temp);

      return { status: "error", error: "Location doesn't exist" };
    }
  } catch (error) {
    console.error(error);
    return { status: "error", error: "Location doesn't exist" };
  }
}
