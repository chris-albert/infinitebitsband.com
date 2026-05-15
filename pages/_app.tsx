import { AppProps } from 'next/app';
import Head from 'next/head';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>INFINITE BITS</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Orbitron:wght@600;700;800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <style jsx global>{`
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        html, body { background: #07080a; overflow-x: hidden; -webkit-font-smoothing: antialiased; }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default App;
