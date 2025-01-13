"use client";

import "./globals.css";
import { OverlaysManager, ThemeProvider, useTheme } from "@interchain-ui/react";
import "@interchain-ui/react/styles";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { theme, themeClass, setTheme } = useTheme();
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <main className={themeClass}>
            {children}
            <OverlaysManager />
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
