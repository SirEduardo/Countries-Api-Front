import React, { createContext, ReactNode, useContext, useState } from "react"

interface ThemeContextType {
  mode: boolean
  toogleMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [mode, setMode] = useState<boolean>(false)
  const toogleMode = () => {
    setMode((prevMode) => !prevMode)
  }
  return (
    <ThemeContext.Provider value={{ mode, toogleMode }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  return context
}
