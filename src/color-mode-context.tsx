"use client";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import * as React from "react";
import _theme from "./theme";

const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

export default function ColorModeProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mode, setMode] = React.useState<"light" | "dark">("light");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    [],
  );

  const theme = React.useMemo(
    () =>
      createTheme({
        ..._theme,
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export const useColorModeContext = () => {
  return React.useContext(ColorModeContext);
};
