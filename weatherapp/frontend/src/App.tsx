import Nav from "./components/nav";
import Weather from "./components/weather";
import "./App.css";

function App() {
  return (
    <>
      <div data-theme="lofi">
        <Nav />
      </div>
      <div>
        <Weather />
      </div>
    </>
  );
}

export default App;
