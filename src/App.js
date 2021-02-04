import React, { useState, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [ip, setIp] = useState("0.0.0.0");
  const [geolocation, setGeolocation] = useState(null);
  const [address, setAddress] = useState({ city: "", country: "" });

  useEffect(() => {
    fetch(
      `https://api.ipdata.co/?api-key=${process.env.REACT_APP_IPDATA_API_KEY}`
    )
      .then((res) => res.json())
      .then((json) => {
        setIp(json["ip"]);
        setAddress({ country: json["country_name"], city: json["city"] });
        setGeolocation({ lad: json["latitude"], long: json["longitude"] });
      });
  }, []);

  const mapIframe =
    geolocation != null ? (
      <iframe
        title="GoogleMaps"
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}&q=${geolocation.lad},${geolocation.long}`}
      />
    ) : null;

  return (
    <div className="App">
      <img src={logo} className="App-logo" alt="logo" />
      <div>
        <h1>{ip}</h1>
        <h2>{address.country}</h2>
        <h4>{address.city}</h4>
      </div>
      {mapIframe}
      <a
        className="App-link"
        href="https://docs.google.com/document/d/1Qv61yNAizOfMb-WAPtR2NnkVBZreR6HiMXA4PgscwOM/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        Ben - Resume
      </a>
    </div>
  );
}

export default App;
