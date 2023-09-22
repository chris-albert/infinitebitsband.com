import React from 'react'
import {Box, Grid} from "@mui/material";
import {Container} from "@mui/system";
import {Nav} from "./Nav";
import {ResponsiveCenterItem} from "./ResponsiveCenterItem";
import useScrollTrigger from "@mui/material/useScrollTrigger";

const bannerStyle: React.CSSProperties = {
  objectFit: 'cover',
  maxWidth: '100%',
  height: 'auto'
}

export type LayoutProps = {
  children: React.ReactElement
}

export const Layout: React.FC<LayoutProps> = ({children}) => {

  const scrollTrigger = useScrollTrigger({threshold: 100})

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav scrollTrigger={scrollTrigger} />
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          zIndex: 0
        }}
      >
        <img
          src='/images/photos/first-show-banner-2.jpg'
          alt='banner'
          style={bannerStyle}
        />
      </Box>

      <Container
        sx={!scrollTrigger ? {
          mt: '-75px',
          zIndex: 100,
          position: 'relative'
        }: {}}
      >
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
