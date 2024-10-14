import { NavLink } from "react-router-dom"
import { useTheme } from "../Context/ThemeContext"
import { Moon, Sun } from "lucide-react"

const Header: React.FC = () => {
  const { mode, toogleMode } = useTheme()
  return (
    <header
      style={{
        background: mode ? "var(--Dark-Blue)" : "var(--White)",
      }}
      className="h-16 flex items-center shadow-md"
    >
      <nav className="w-full flex justify-around">
        <NavLink to="/">
          <h3
            style={{
              color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
            }}
            className="text-xl font-semibold"
          >
            Where in the world?
          </h3>
        </NavLink>
        <button
          style={{
            color: mode ? "var(--White)" : "var(--Very-Dark-Blue-Light)",
          }}
          onClick={toogleMode}
          className="text-sm flex items-center gap-2"
        >
          {mode ? <Sun /> : <Moon />}
          {mode ? "Light Mode" : "Dark Mode"}
        </button>
      </nav>
    </header>
  )
}

export default Header
