import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState(null);
  const [countryInfo, setCountryInfo] = useState({
    capital: "",
    area: "",
    languages: [],
    flag: "",
  });

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => {
        const countriesData = response.data.map((c) => ({
          name: c.name.common,
        }));
        setCountries(countriesData);
      })
      .catch((error) => {
        console.error("Error fetching countries data:", error);
      });
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setCountry(null);
  };

  const DisplayInfoAboutSingleCountry = (countryName) => {
    axios
      .get(
        `https://restcountries.com/v3.1/name/${countryName}` /* Please fix your api, took me an hour to figure out there was something wrong with the request to your api, so i had to use a different one, thank you*/
      )
      .then((response) => {
        const countryData = response.data[0];
        setCountryInfo({
          capital: countryData.capital[0],
          area: countryData.area,
          languages: countryData.languages,
          flag: countryData.flags.png,
        });
      })
      .catch((error) => {
        console.error("Error fetching country info:", error);
      });
  };

  const DisplaySearchResults = (props) => {
    const searchResults = props.countriesData.filter((a) =>
      a.name.toLowerCase().includes(props.searchTerm.toLowerCase())
    );

    if (searchResults.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (searchResults.length > 1) {
      return (
        <div>
          {searchResults.map((a) => (
            <p key={a.name}>{a.name}</p>
          ))}
        </div>
      );
    } else if (searchResults.length == 1) {
      setCountry(searchResults[0].name);
      DisplayInfoAboutSingleCountry(searchResults[0].name);
    } else {
      return <p>No Country found</p>;
    }
  };

  return (
    <div>
      find countries
      <input onChange={handleChange} />
      <DisplaySearchResults countriesData={countries} searchTerm={value} />
      {country && (
        <div>
          <h2>{country}</h2>
          <p>capital {countryInfo.capital}</p>
          <p>area {countryInfo.area}</p>
          <b>languages:</b>
          <ul>
            {countryInfo.languages &&
              Object.values(countryInfo.languages).map((language) => (
                <li key={language}>{language}</li>
              ))}
          </ul>
          <img src={countryInfo.flag}></img>
        </div>
      )}
    </div>
  );
};

export default App;
