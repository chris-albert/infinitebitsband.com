import React from 'react'
import {Box, Grid} from "@mui/material";
import {Container} from "@mui/system";
import {Nav} from "./Nav";
import {ResponsiveCenterItem} from "./ResponsiveCenterItem";

export type LayoutProps = {
  children: React.ReactElement
}

export const Layout: React.FC<LayoutProps> = ({children}) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <Container>
        <Box sx={{py: 1}}/>
        <Grid container spacing={0} >
          <ResponsiveCenterItem>
            {children}
          </ResponsiveCenterItem>
        </Grid>
      </Container>
    </Box>
  )
}
