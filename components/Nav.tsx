import React from 'react'
import {AppBar, Box, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

export type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%'
        }}>
          <Box>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Typography variant="h6" component="div" >
              Infinite Bits
            </Typography>
          </Box>
          <Box></Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
