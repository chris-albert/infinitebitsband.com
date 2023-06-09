import Head from 'next/head'
import { GetStaticProps } from 'next'
import {Box} from "@mui/material";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import {Layout} from "../components/Layout";

const darkTheme = createTheme({
  palette: {
      mode: 'dark',
  },
});

export default function Home({}) {
  return (
    <Box>
      <Head>
        <title>Infinite Bits</title>
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
