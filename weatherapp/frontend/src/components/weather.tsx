import { useState, useEffect } from "react";
import "../App.css";

function Weather() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [weather, setWeather] = useState<any>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (!coords) return;
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/sendWeather", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(coords),
        });
        const data = await res.json();
        setWeather(data);
      } catch (error) {
        console.error("Błąd przy pobieraniu danych pogodowych:", error);
      }
    })();
  }, [coords]);

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 text-center rounded-box shadow-xl p-8 w-full max-w-xl mx-auto mt-8">
      <h1 className="text-4xl text-primary font-bold mb-2">Aktualna pogoda</h1>
      <h2 className="text-2xl text-accent mb-4">
        Temperatura:{" "}
        {weather?.main?.temp ? Math.round(weather.main.temp - 275.15) : "-"}°C
      </h2>
      <h3 className="text-xl mb-6">
        Temperatura odczuwalna:{" "}
        {weather?.main?.feels_like
          ? Math.round(weather.main.feels_like - 275.15)
          : "-"}
        °C
      </h3>
      <ul className="menu menu-vertical bg-base-200 rounded-box w-full p-4 gap-2">
        <li className="text-lg">
          Ciśnienie: {weather?.main?.pressure ?? "-"} hPa
        </li>
        <li className="text-lg">
          Wilgotność: {weather?.main?.humidity ?? "-"}%
        </li>
        <li className="text-lg">Wiatr: {weather?.wind?.speed ?? "-"} m/s</li>
        <li className="text-lg">
          Zachmurzenie %: {weather?.clouds?.all ?? "-"}
        </li>
        <li className="text-lg">
          Opis: {weather?.weather?.[0]?.description ?? "-"}
        </li>
      </ul>
    </div>
  );
}

export default Weather;
