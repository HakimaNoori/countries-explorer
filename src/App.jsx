import { useEffect, useState } from "react"
import CountryCard from "./components/CountryCard"
import SearchBar from "./components/SearchBar"
import RegionFilter from "./components/RegionFilter"  



function App() {
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [region, setRegion] = useState('all')

 const fetchCountries = async () => {
  try {
    setLoading(true);
    setError(null);

    const trimmedSearch = search.trim();

    let url;

    if (trimmedSearch.length >= 2) {
      url = `https://restcountries.com/v3.1/name/${encodeURIComponent(trimmedSearch)}`;
    } else if (region !== "all") {
      url = `https://restcountries.com/v3.1/region/${region}`;
    } else {
      url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3";
    }

    console.log("Fetching from:", url);

    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error("API Error details:", response.status, errorText);
      throw new Error(`Failed to fetch countries (${response.status})`);
    }

    let data = await response.json();
    if (!Array.isArray(data)) data = [data];

    setCountries(
      data.sort((a, b) => (b.population || 0) - (a.population || 0))
    );
  } catch (err) {
    console.error("Fetch failed:", err);
    setError(err.message);
    setCountries([]);
  } finally {
    setLoading(false);
  }
};

      useEffect(() => {
        fetchCountries()
      }, [search, region])


  return (
    <div className="min-h-screen bg-purple-100 p-6">
     <div className="max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Countries Explorer</h1>
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
        <button
  onClick={() => {
    setSearch('');
    setRegion('all');
  }}
  className="bg-purple-500 text-white px-4 py-2 rounded-lg"
>
  Clear Filters
</button>
      </div>
      {loading && (<p className="text-center text-lg font-medium">Loading countries...</p>)}
      {error && (
        <div className="text-center">
          <p className="text-red-500 font-semibold mb-2">
            Error: {error}
          </p>
          <button onClick={fetchCountries} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
            Retry
          </button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
        <p className="text-center text-gray-600">
          No countries found.
          </p>
      )}

      <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-6">
        {!loading && !error && countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
    </div>
  )
}

export default App
