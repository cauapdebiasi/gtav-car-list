import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className="min-h-screen relative bg-[#500707] before:opacity-5 before:absolute before:-z-10 before:bg-chess-pattern before:bg-[150px_auto] before:w-full before:h-full before:left-0 before:top-0">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
