import "../styles/globals.css";
import "../lib/hexStyles.css";
import { TweetbagProvider } from "../context/TweetbagContext";
import Head from "next/head";
import Modal from "react-modal";
Modal.setAppElement("#__next");

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Tweetbag</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TweetbagProvider>
        <Component {...pageProps} />
      </TweetbagProvider>
    </>
  );
}

export default MyApp;
