import { useQuery } from "@tanstack/react-query";
import "./App.css";
import type { Countries, Country, PublicHolidays } from "./types";
import { useState } from "react";

const getHolidaysApi = async (path: string) => {
  const response = await fetch("https://openholidaysapi.org/" + path);
  return await response.json();
};

const getCountries = async (): Promise<Countries> => {
  return await getHolidaysApi("Countries");
};

const getPublicHolidays = async (
  languageIsoCode?: string
): Promise<PublicHolidays> => {
  return await getHolidaysApi(
    `PublicHolidays?countryIsoCode=${languageIsoCode}&validFrom=2025-01-01&validTo=2025-12-31&languageIsoCode=EN`
  );
};

function App() {
  const initialSelection = "Netherlands (the)";
  const [selectedCountry, setSelectedCountry] = useState(initialSelection);
  const {
    isPending,
    error,
    data: countries,
  } = useQuery({
    queryKey: ["countries"],
    queryFn: getCountries,
  });

  const findLanguageInEnglishName = (item: Country) =>
    item.name.find((name) => name.language === "EN")?.text;

  const listfOfCountryNames = countries?.map(findLanguageInEnglishName);

  const isoCode = countries?.find(
    (item) => findLanguageInEnglishName(item) === selectedCountry
  )?.isoCode;

  const { data: publicHolidays } = useQuery({
    queryKey: ["publicholidays", isoCode],
    queryFn: () => getPublicHolidays(isoCode),
    enabled: Boolean(isoCode),
  });

  const holidaysExtracted = publicHolidays?.map(findLanguageInEnglishName);

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      <h1>Vite + React</h1>
      <div className="card">
        <label htmlFor="country-select">Select country</label>

        <select
          id="country-select"
          defaultValue={selectedCountry}
          onChange={(e) => setSelectedCountry(e.target.value)}
        >
          {listfOfCountryNames?.map((country) => (
            <option key={country} value={country}>
              {country}
            </option>
          ))}
        </select>

        <ul>
          {holidaysExtracted?.map((holiday) => (
            <li key={holiday}>{holiday}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
