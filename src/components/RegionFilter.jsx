function RegionFilter({ region, setRegion }) {
    return(
        <select
        value={region}
        onChange={(e) => setRegion(e.target.value)}
        className="px-4 py-2 rounded-lg bg-white border border-purple-300 focus:outline-none focus:ring-2 focus:ring-purple-600">
        <option value="All">All</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
        </select>
    )
}

export default RegionFilter;