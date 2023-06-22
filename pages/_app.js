import GlobalStyle from "../styles";
import Head from "next/head";

export const apikey = process.env.NEXT_PUBLIC_API_KEY;
console.log(apikey);

export default function App({ Component, pageProps }) {
  return (
    <>
      <GlobalStyle />
      <Head>
        <title>Marvel Cinematic Unisearch</title>
      </Head>
      <Component {...pageProps} />
    </>
  );
}
