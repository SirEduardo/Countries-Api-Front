import { Link, useParams } from "react-router-dom"
import { useTheme } from "../../components/Context/ThemeContext"
import React, { useEffect, useState } from "react"
import { Country } from "../../types"
import { ArrowLeft } from "lucide-react"
import { API_URL } from "../../utils/api/api"

const CountryById: React.FC = () => {
  const { id } = useParams()
  const { mode } = useTheme()
  const [country, setCountry] = useState<Country | undefined>()
  const [allCountries, setAllCountries] = useState<Country[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch(`${API_URL}/countries/`)
      .then((response) => response.json())
      .then((data: Country[]) => {
        const selectedCountry = data.find((country) => country.name === id)
        setCountry(selectedCountry)
        setAllCountries(data)
      })

      .catch((error) => console.error("Error fetching country data: ", error))
      .finally(() => setLoading(false))
  }, [id])

  const getBorderCountryNames = (borders: string[]) => {
    return borders.map((borderCode) => {
      const borderCountry = allCountries.find(
        (country) => country.alpha3Code === borderCode
      )
      return borderCountry ? borderCountry.name : borderCode
    })
  }

  return (
    <main
      style={{
        backgroundColor: mode
          ? "var(--Very-Dark-Blue-Dark)"
          : "var(--Very-Light-Gray)",
        color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
      }}
      className="min-h-screen"
    >
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={() => window.history.back()}
          className="mb-8 flex items-center px-8 py-2 rounded-md shadow-gray-600 shadow-sm"
          style={{
            backgroundColor: mode ? "var(--Dark-Blue)" : "white",
            color: mode ? "white" : "var(--Very-Dark-Blue-Light)",
          }}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </button>
        {loading ? (
          <p>Loading country details...</p>
        ) : country ? (
          <div className="flex pt-20 justify-around items-center w-full gap-20">
            <img
              src={country.flag}
              alt={`Flag of ${country.name}`}
              className="w-1/2 h-auto"
            />
            <div className="flex flex-col">
              <h2 className="font-bold text-3xl">{country.name}</h2>
              <div className="mt-10">
                <div className="flex gap-32">
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>Native Name:</strong> {country.nativeName}
                    </p>
                    <p>
                      <strong>Population:</strong>{" "}
                      {country.population.toLocaleString()}
                    </p>
                    <p>
                      <strong>Region:</strong> {country.region}
                    </p>
                    <p>
                      <strong>Sub Region:</strong> {country.subregion}
                    </p>
                    <p>
                      <strong>Capital:</strong> {country.capital}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <p>
                      <strong>Top Level Domain:</strong>{" "}
                      {country.topLevelDomain}
                    </p>
                    <p>
                      <strong>Currencies:</strong>{" "}
                      {country.currencies.map((c) => c.name).join(", ")}
                    </p>
                    <p>
                      <strong>Languages:</strong>{" "}
                      {country.languages.map((l) => l.name).join(", ")}
                    </p>
                  </div>
                </div>
                {country.borders && (
                  <div className="mt-8 flex items-center">
                    <h2 className="text-xl font-semibold mb-2">
                      Border Countries:
                    </h2>
                    <div className="flex flex-wrap">
                      {getBorderCountryNames(country.borders).map(
                        (borderCountry, index) => (
                          <Link
                            to={`/country/${borderCountry}`}
                            key={index}
                            className={`px-2 py-1 rounded-full text-sm transition-colors duration-200 hover:bg-opacity-90`}
                          >
                            <div
                              style={{
                                backgroundColor: mode
                                  ? "var(--Dark-Blue)"
                                  : "white",
                                color: mode
                                  ? "white"
                                  : "var(--Very-Dark-Blue-Light)",
                              }}
                              className="bg-white px-4 py-2 rounded-md shadow-md"
                            >
                              {borderCountry}
                            </div>
                          </Link>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <p>Country not found.</p>
        )}
      </div>
    </main>
  )
}

export default CountryById
