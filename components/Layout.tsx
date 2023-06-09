import React from 'react'
import {Box} from "@mui/material";
import {Home} from "./Home";
import {Container} from "@mui/system";
import {Nav} from "./Nav";

export type LayoutProps = {}

export const Layout: React.FC<LayoutProps> = ({}) => {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Nav />
      <Container>
        <Home />
      </Container>
    </Box>
  )
}
