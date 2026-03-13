import { ThemeProvider } from "@emotion/react";
import { createContext, useMemo, useState } from "react";
import { getTheme } from "./theme";

// to export toggle function to all components.
export const ColorModeContext = createContext({
  toggleColorMode: () => {},
});

export const ThemeContextProvider = ({ children }: any) => {
  const [mode, setMode] = useState<"light" | "dark">(
    () => (localStorage.getItem("theme") as "light" | "dark") || "light",
  );

  //   function to toggle theme.
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("theme", newMode);
          return newMode;
        });
      },
    }),
    [],
  );

  // To get the theme(colors and all)
  const theme = useMemo(() => getTheme(mode), [mode]);

  return (
    // To provide the toggeleColorMode function.
    <ColorModeContext.Provider value={colorMode}>
      {/* the theme provided here will be set on the UI */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
