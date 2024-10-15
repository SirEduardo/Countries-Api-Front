import React, { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"
import { Country } from "../../types"
import { Link } from "react-router-dom"
import Search from "../../components/Search/Search"
import { useTheme } from "../../components/Context/ThemeContext"

const Home: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([])
  const { mode } = useTheme()

  useEffect(() => {
    fetch("/src/data.json")
      .then((response) => response.json())
      .then((data) => {
        const countriesWithId = data.map((country: Country) => ({
          ...country,
          id: uuidv4(),
        }))
        setCountries(countriesWithId)
      })
      .catch((error) => console.error("Error al cargar los datos:", error))
  }, [])

  return (
    <main
      style={{
        backgroundColor: mode
          ? "var(--Very-Dark-Blue-Dark)"
          : "var(--Very-Light-Gray)",
        color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
      }}
      className="min-h-screen transition duration-300"
    >
      <Search countries={countries} setCountries={setCountries} />
      <section className="flex justify-center flex-wrap gap-20 p-20">
        {countries.map((country) => (
          <Link to={`/country/${country.name}`} key={country.id}>
            <div
              style={{
                background: mode ? "var(--Dark-Blue)" : "var(--White)",
                color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
              }}
              className="flex flex-col bg-white rounded-md shadow-sm max-w-60"
            >
              <img
                className="w-60 h-40 rounded-t-md object-cover"
                src={country.flag}
                alt={country.name}
              />
              <h2 className="font-semibold px-4 pt-4">{country.name}</h2>
              <div className="flex flex-col p-4">
                <span>Population: {country.population.toLocaleString()}</span>
                <span>Region: {country.region}</span>
                <span>Capital: {country.capital}</span>
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  )
}

export default Home
