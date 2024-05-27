import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import ColorModeProvider from "@/color-mode-context";

//const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "fipe query",
  description: "Querying fipe values",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ColorModeProvider>
            {children}
            <CssBaseline />
          </ColorModeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
