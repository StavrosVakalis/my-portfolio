import "../styles/globals.css";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from "next-auth/react";

const App = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session} basePath="https://stavrosvakalis.github.io/my-portfolio/api/auth">
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  );
};

export default App;
