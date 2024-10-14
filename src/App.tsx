import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home/Home"
import Country from "./pages/Country/Country"
import Header from "./components/Header/Header"
import React from "react"
import { ThemeProvider } from "./components/Context/ThemeContext"

const App: React.FC = () => {
  return (
    <ThemeProvider>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/country/:id" element={<Country />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
