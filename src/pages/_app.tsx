import type { NextPage } from "next";
import { Karla } from "next/font/google";
import type { ReactElement, ReactNode } from "react";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { appWithTranslation } from 'next-i18next';
import "src/styles/globals.css";

const karla = Karla({
  subsets: ["latin"],
});
 
const queryClient = new QueryClient();

export type NextPageWithLayout<P = unknown, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <QueryClientProvider client={queryClient}>
      <main className={karla.className}>
        {getLayout(<Component {...pageProps} />)}
      </main>
    </QueryClientProvider>
  );
};

export default appWithTranslation(MyApp);
