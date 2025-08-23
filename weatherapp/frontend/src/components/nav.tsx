import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.css";

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
      fetch("http://127.0.0.1:8000/sendLocation/", {
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
        <h2>{locationName}</h2>
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
    <div className="list-group">
      <h1>Pogoda</h1>
      <ul>
        <li className="list-group-item">Dzisiaj jest: {getDate()}</li>
        <li className="list-group-item">
          Jesteś w: <Location />
        </li>
      </ul>
    </div>
  );
}

export default Nav;
