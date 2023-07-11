import "@/styles/globals.css";
import { useCallback, useEffect } from "react";
import { RecoilRoot, useRecoilState } from "recoil";
import type { AppProps } from "next/app";
import Message from "@/components/Message";
import {
  isVisibleState,
  messageState,
  statusState,
  isLoadingState,
} from "@/libs/message";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import Head from "next/head";

import { Ubuntu } from "next/font/google";

const ubuntu = Ubuntu({
  weight: ["300", "400", "500", "700"],
  subsets: ["latin"],
  variable: "--font-ubuntu",
});

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  const [messageVisible, setMessageVisible] = useRecoilState(isVisibleState);
  const [message, setMessage] = useRecoilState(messageState);
  const [status, setStatus] = useRecoilState(statusState);
  const [isLoading, setIsLoading] = useRecoilState(isLoadingState);

  // handle page change loading
  const router = useRouter();
  const handleStart = useCallback(() => {
    setIsLoading(true);
  }, [setIsLoading]);

  const handleComplete = useCallback(() => {
    setIsLoading(false);
  }, [setIsLoading]);

  // show loading on page change
  useEffect(() => {
    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);
    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [handleStart, handleComplete, router.events]);

  return (
    <>
      <Head>
        <title>Nextflix</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
      </Head>
      <div className={`${ubuntu.className} w-full h-full`}>
        <Message
          message={message}
          setMessageVisible={setMessageVisible}
          messageVisible={messageVisible}
          status={status}
        />
        <Component {...pageProps} />
      </div>
    </>
  );
};

export default function App(appProps: AppProps) {
  return (
    <RecoilRoot>
      <AppWrapper {...appProps} />
    </RecoilRoot>
  );
}
