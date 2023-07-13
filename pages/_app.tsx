import { AppProps } from 'next/app';
import {Box} from "@mui/material";
import background from "../public/images/rainbox-noise-5.png";
import Head from "next/head";
import {createTheme, ThemeProvider} from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import {Layout} from "../components/Layout";

import "@fontsource/roboto-mono/600.css";

export const blue = 'rgb(16, 81, 145)'
export const pink = 'rgb(143, 19, 66)'

const darkTheme = createTheme({
  components: {
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(45deg, ${blue}, ${pink})`
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: `linear-gradient(45deg, ${blue}, ${pink})`
        },
      },
    }
  },
  typography: {
    fontFamily: [
      'Roboto Mono',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    // divider: pink,
    secondary: {
      dark: pink,
      main: blue
    },
    background: {
      default: blue,
      paper: blue,
    }
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        minHeight: '100vh',
        backgroundImage: `url(${background.src})`,
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >
      <Head>
        <title>infinite_bits</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Box>
  )
}

export default App;