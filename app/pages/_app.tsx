import type { AppProps } from 'next/app'
import { ThemeProvider } from '~/lib/theme'
import '../styles/globals.css'
import React from "react";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
        <ThemeProvider>
            <Component {...pageProps} />
        </ThemeProvider>
    </>
  )
}

export default MyApp
