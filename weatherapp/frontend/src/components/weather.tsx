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
    <>
      <div>
        <div>
          <h1>Temperatura: {Math.round(weather?.main?.temp) - 275}°C</h1>
          <h3>
            Temperatura odczuwalna:{" "}
            {Math.round(weather?.main?.feels_like) - 275}°C
          </h3>
        </div>
        <div>
          <ul>
            <li>Ciśnienie: {weather?.main?.pressure}hPa</li>
            <li>Wilgotność: {weather?.main?.humidity}%</li>
            <li>Wiatr: {weather?.wind?.speed}m/s</li>
            <li>Zachmurzenie %: {weather?.clouds?.all} %</li>
            <li>Zachmurzenie: {weather?.weather?.[0]?.description}</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Weather;
