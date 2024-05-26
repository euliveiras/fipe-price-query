"use client";
import { Roboto } from "next/font/google";
import { createTheme } from "@mui/material/styles";
import { grey } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    title: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    title?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    title: true;
  }
}

const roboto = Roboto({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  display: "swap",
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
    subtitle1: {
      fontSize: "1.5rem",
      fontWeight: "semibold",
      textAlign: "center",
    },
    title: { fontSize: "1.75rem", fontWeight: "bold" },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
    //      backgroundColor: grey[50],
          height: "100dvh",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          title: "h1",
        },
      },
    },
  },
});

export default theme;
