function CountryCard({ country }) {
  const formatPopulation = (num) => {
    if (!num) return "N/A";
    return num.toLocaleString("en-US"); 
  };

  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <img
        src={country.flags?.png || country.flags?.svg || "/placeholder-flag.png"}
        alt={`Flag of ${country.name?.common || "Unknown"}`}
        className="w-full h-32 object-cover"
      />
      <div className="p-4">
        <h3 className="text-lg font-bold mb-2 truncate">
          {country.name?.common || "Unknown Country"}
        </h3>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Region:</span>{" "}
          {country.region || "N/A"}
        </p>
        <p className="text-sm text-gray-600">
          <span className="font-semibold">Population:</span>{" "}
          {formatPopulation(country.population)}
        </p>
      </div>
    </div>
  );
}

export default CountryCard;