import "../styles/globals.css";

import { QueryClient, QueryClientProvider } from "react-query";
import { useEffect, useState } from "react";

import { AuthContext } from "../components/setup/context";
import router from "next/router";
import useLocalStorage from "../components/hooks/useLocalStorage";

const queryCache = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: true,
      retry: false,
      staleTime: 20000,
    },
  },
});

function App({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryCache}>
      <Component {...pageProps} />
    </QueryClientProvider>
  );
}

export default App;
