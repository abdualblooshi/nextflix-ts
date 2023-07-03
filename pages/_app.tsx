import "@/styles/globals.css";
import { RecoilRoot, useRecoilState } from "recoil";
import type { AppProps } from "next/app";
import Message from "@/components/message";
import { isVisibleState, messageState, statusState } from "@/lib/message";

const AppWrapper = ({ Component, pageProps }: AppProps) => {
  const [messageVisible, setMessageVisible] = useRecoilState(isVisibleState);
  const [message, setMessage] = useRecoilState(messageState);
  const [status, setStatus] = useRecoilState(statusState);

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
