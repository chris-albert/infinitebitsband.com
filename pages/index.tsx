import Head from 'next/head'
import { GetStaticProps } from 'next'
import {Box} from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Layout} from "../components/Layout"
import background from "../public/images/rainbox-noise-5.png"

import "@fontsource/roboto-mono/600.css"; // Defaults to weight 400

// const blue = 'rgb(114, 193, 220)'
const blue = 'rgb(16, 81, 145)'
const pink = 'rgb(143, 19, 66)'

const darkTheme = createTheme({
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

export default function Home({}) {
  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        // height: '100%',
        backgroundImage: `url(${background.src})`,
        backgroundPosition: 'center',
        // backgroundSize: 'cover',
        backgroundRepeat: 'repeat'
      }}
    >
      <Head>
        <title>infinite bits</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Layout />
      </ThemeProvider>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
