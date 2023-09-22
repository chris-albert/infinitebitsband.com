import React from 'react'
import {Box, Grid} from "@mui/material";
import {Container} from "@mui/system";
import {Nav} from "./Nav";
import {ResponsiveCenterItem} from "./ResponsiveCenterItem";

const bannerStyle: React.CSSProperties = {
  objectFit: 'cover',
  maxWidth: '100%',
  height: 'auto'
}

export type LayoutProps = {
  children: React.ReactElement
}

export const Layout: React.FC<LayoutProps> = ({children}) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <Box
        sx={{
          position: 'relative',
          width: '100%'
        }}
      >
        <img
          src='/images/photos/first-show-banner-2.jpg'
          alt='banner'
          style={bannerStyle}
        />
      </Box>

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
