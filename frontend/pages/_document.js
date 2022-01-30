import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    return (
      <Html>
        <Head>
          <meta name="description" content="User management app" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body className="min-h-screen bg-gray-100">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
