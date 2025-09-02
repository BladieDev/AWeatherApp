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
          console.log("Location response:", data);
          setLocationName(
            data.address?.city || data.address?.town || data.display_name
          );
          setError(null);
        });
    }
  }, [coords]);

  return (
    <div className="flex flex-col justify-center items-center bg-base-100 text-center rounded-box shadow-xl p-8 w-full max-w-xl mx-auto mt-8">
      <h2 className="text-2xl text-primary font-bold mb-2">
        Twoja lokalizacja
      </h2>
      {locationName ? (
        <div className="text-xl text-accent mb-2">Jesteś w: {locationName}</div>
      ) : error ? (
        <div className="text-lg text-error">Błąd: {error}</div>
      ) : (
        <div className="text-lg">Nie udało się pobrać lokalizacji.</div>
      )}
    </div>
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
        <h1 className="text-5xl text-accent p-8">Your Weather</h1>
        <div className="flex flex-row justify-center items-center gap-4 w-full">
          <div className="flex flex-col justify-center items-center bg-base-100 text-center rounded-box shadow-xl p-8 w-full max-w-xl mx-auto mt-8">
            <h2 className="text-2xl text-primary font-bold mb-2">Data</h2>
            <div className="text-xl text-accent mb-2">
              Dzisiaj jest: {getDate()}
            </div>
          </div>
          <Location />
        </div>
      </div>
    </>
  );
}

export default Nav;
