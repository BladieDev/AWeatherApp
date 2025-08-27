import { useState, useEffect } from "react";
import "../App.css";
function Location() {
  const [coords, setCoords] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Pobierz współrzędne użytkownika
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setCoords({ latitude, longitude });
      });
    }
  }, []);

  // Wyślij współrzędne do backendu Django i odbierz nazwę lokalizacji
  useEffect(() => {
    if (coords) {
      fetch("http://127.0.0.1:8000/sendLocation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(coords),
      })
        .then((response) => {
          if (!response.ok)
            return response.json().then((data) => {
              throw new Error(data.error || "Błąd sieci");
            });
          return response.json();
        })
        .then((data) => {
          setLocationName(
            data.address?.city || data.address?.town || data.display_name
          );
          setError(null);
        });
    }
  }, [coords]);

  return (
    <>
      {locationName ? (
        <h2> Jesteś w: {locationName}</h2>
      ) : error ? (
        <p style={{ color: "red" }}>Błąd: {error}</p>
      ) : (
        <p>Nie udało się pobrać lokalizacji.</p>
      )}
    </>
  );
}

function getDate() {
  const setDate = new Date();
  return setDate.toLocaleDateString("pl");
}

function Nav() {
  return (
    <>
      <div className="flex flex-col justify-center items-center bg text-center">
        <h1 className="text-5xl text-accent p-5">Your Weather</h1>
        <div className="flex flex-row justify-center items-center gap-8 w-full">
          <ul className="menu menu-horizontal bg-base-200 rounded-box w-1/4 p-4 justify-center">
            <li>
              <h2 className="text-xl">Dzisiaj jest: {getDate()}</h2>
            </li>
          </ul>
          <ul className="menu menu-horizontal bg-base-200 rounded-box w-1/4 p-4 justify-center">
            <li>
              <h1 className="text-xl">
                <Location />
              </h1>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Nav;
