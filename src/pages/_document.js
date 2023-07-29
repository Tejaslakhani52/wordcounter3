import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat&display=swap"
          rel="stylesheet"
        ></link>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inconsolata&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      ;
      <body
        className={` bg-[#f6f8fa]`}
        style={{ fontFamily: "'Inter', sans-serif", overflowX: "hidden" }}
      >
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
