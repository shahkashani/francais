import Head from 'next/head';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk&display=swap');

        html,
        body {
          padding: 0;
          margin: 0;
          font-family: 'Space Grotesk', sans-serif;
          overflow: hidden;
        }

        input {
          font-size: 16px;
          font-family: 'Space Grotesk', sans-serif;
        }
        
        button {
          cursor: pointer;
        }

        * {
          box-sizing: border-box;
        }

        :root {
          --correct: #29b711;
          --incorrect: #cf4125;
        }
      `}</style>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
