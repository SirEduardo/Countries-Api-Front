import { SearchIcon } from "lucide-react"
import React, { useEffect, useState } from "react"
import { Country } from "../../types"
import { useTheme } from "../Context/ThemeContext"

interface Props {
  countries: Country[]
  setCountries: (countries: Country[]) => void
}

const Search: React.FC<Props> = ({ countries, setCountries }) => {
  const [originalCountries, setOriginalCountries] = useState<Country[]>([])
  const [selectedRegion, setSelectedRegion] = useState("")
  const [searchTerm, setSearchTerm] = useState("")
  const { mode } = useTheme()

  useEffect(() => {
    if (originalCountries.length === 0) {
      setOriginalCountries(countries)
    }
  }, [countries, originalCountries])

  const regions = Array.from(
    new Set(originalCountries.map((country) => country.region))
  )
  const applyFilters = () => {
    let filteredCountries = originalCountries

    if (selectedRegion) {
      filteredCountries = filteredCountries.filter(
        (country) => country.region === selectedRegion
      )
    }

    if (searchTerm) {
      filteredCountries = filteredCountries.filter((country) =>
        country.name.toLowerCase().includes(searchTerm)
      )
    }

    setCountries(filteredCountries)
  }

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedRegion(e.target.value)
  }

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value.toLowerCase())
  }
  useEffect(() => {
    applyFilters()
  }, [searchTerm, selectedRegion])

  return (
    <div className="flex justify-between px-20 pt-20">
      <div className="relative w-1/2">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for a country..."
          className="w-1/2 pl-10 pr-4 py-2 shadow-md rounded-sm"
          style={{
            background: mode ? "var(--Dark-Blue)" : "var(--White)",
            color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
          }}
        />
        <SearchIcon
          style={{
            color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
          }}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
        />
      </div>
      <select
        value={selectedRegion}
        onChange={handleRegionChange}
        aria-label="Filter by Region"
        className="appearance-none rounded-md px-4 py-2 bg-white shadow-md"
        style={{
          background: mode ? "var(--Dark-Blue)" : "var(--White)",
          color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
        }}
      >
        <option value="">Filter by Region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Search
