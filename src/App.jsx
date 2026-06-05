import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch(
      "https://countries-search-data-prod-812920491762.asia-south1.run.app/countries"
    )
      .then((res) => res.json())
      .then((data) => {
        setCountries(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country?.common?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app">
      <input
        type="text"
        placeholder="Search countries..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="countriesContainer">
        {filteredCountries.map((country) => (
          <div className="countryCard" key={country.common}>
            <img src={country.png} alt={country.common} />
            <p>{country.common}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;