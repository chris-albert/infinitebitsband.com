import Head from 'next/head'
import { GetStaticProps } from 'next'
import {Box} from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Layout} from "../components/Layout"

import "@fontsource/roboto-mono/600.css"; // Defaults to weight 400

const blue = 'rgb(114, 193, 220)'
const pink = 'rgb(143, 19, 66)'

const darkTheme = createTheme({
  typography: {
    fontFamily: [
      'Roboto Mono',
    ].join(','),
  },
  palette: {
    mode: 'dark',
    divider: blue,
    secondary: {
      dark: pink,
      main: pink
    },
    background: {
      default: blue,
      paper: pink,
    }
  },
});

export default function Home({}) {
  return (
    <Box>
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
