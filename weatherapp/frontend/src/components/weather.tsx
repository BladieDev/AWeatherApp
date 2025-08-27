import { useState, useEffect } from "react";
import "../App.css";

function Weather() {
  let tempInCels;
  let fellsTempInCels;
  let sunriseReal;
  const [temp, setTemp] = useState<number | null>(null);
  const [feelsTemp, setFeelsTemp] = useState<number | null>(null);
  const [pressure, setPressure] = useState<number | null>(null);
  const [humidity, setHumidity] = useState<number | null>(null);
  const [windSpeed, setWindSpeed] = useState<number | null>(null);
  const [clouds, setClouds] = useState<number | null>(null);
  const [sunrise, setSunrise] = useState<number | null>(null);
  const [sunset, setSunset] = useState<number | null>(null);
  const [desc, setDesc] = useState<string | null>(null);
  const [main, setMain] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/sendWeather");
        const data = await res.json();

        setTemp(data.main?.temp ?? null);
        if (temp !== null) {
          tempInCels = Math.round(300 - temp);
          fellsTempInCels = Math.round(300 - temp);
          sunriseReal = new Date(sunrise * 1000).toLocaleTimeString();
        }
        setFeelsTemp(data.main?.feels_like ?? null);
        setPressure(data.main?.pressure ?? null);
        setHumidity(data.main?.humidity ?? null);
        setWindSpeed(data.wind?.speed ?? null);
        setClouds(data.clouds?.all ?? null);
        setSunrise(data.sys?.sunrise ?? null);
        setSunset(data.sys?.sunset ?? null);
        setDesc(data.weather?.description ?? null);
        setDesc(data.weather?.description ?? null);
      } catch (err) {
        console.error("Błąd przy pobieraniu danych pogodowych:", err);
      }
    })();
  }, []);

  return (
    <>
      <div>
        <div>
          <h1>Temperatura:{tempInCels}°C</h1>
          <h3>Temperatura odczuwalna:{fellsTempInCels}°C</h3>
        </div>
        <div>
          <ul>
            <li>Ciśnienie:{pressure}hPa</li>
            <li>Wilgotność: {humidity}%</li>
            <li>Wiatr: {windSpeed}m/s</li>
            <li>Zachmurzenie %: {clouds}</li>
            <li>Zachmurzenie: {desc}</li>
            <li>Wschód słońca:</li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Weather;
