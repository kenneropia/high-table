export interface IWeatherData {
  status: "data";
  data: {
    temperature: { C: number; F: number };
    wind: number;
    humidity: number;
    description: string;
  };
}

export interface ILocationObject {
  location: string;
  timestamp: number;
}
