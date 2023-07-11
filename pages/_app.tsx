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
      <Message
        message={message}
        setMessageVisible={setMessageVisible}
        messageVisible={messageVisible}
        status={status}
      />
      <Component {...pageProps} />
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
