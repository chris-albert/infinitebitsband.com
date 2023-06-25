import React from 'react'
import {AppBar, Box, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import Image from "next/image";
import headerLogo from "../public/images/logo-long-20.png"
// import headerLogo from "../public/images/logo-full-long-negative.png"

export type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  const [navOpen, setNavOpen] = React.useState(false)

  return (
    <AppBar
      position="sticky"
      enableColorOnDark={true}
      color='secondary'
    >
      <Toolbar>
        <Drawer
          anchor='left'
          open={navOpen}
          onClose={() => setNavOpen(false)}
        >
          <List>
            {['audios', 'videos', 'events', 'photos'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton
                  onClick={() => {}}
                >
                  <Link href={'/' + text}>{text}</Link>
                  {/*<ListItemText primary={text} />*/}
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
        <Box sx={{
          display: 'flex',
          justifyContent: 'space-between',
          height: '100%',
          width: '100%'
        }}>
          <Box>
            {/*<IconButton*/}
            {/*  size="large"*/}
            {/*  edge="start"*/}
            {/*  color="inherit"*/}
            {/*  aria-label="menu"*/}
            {/*  onClick={() => setNavOpen(true)}*/}
            {/*  sx={{ mr: 2 }}*/}
            {/*>*/}
            {/*  <MenuIcon />*/}
            {/*</IconButton>*/}
          </Box>
          <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <Image src={headerLogo} height={50} alt="logo" />
            {/*<Typography variant="h6" component="div" >*/}
            {/*  ... infinite_bits ...*/}
            {/*</Typography>*/}
          </Box>
          <Box></Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
