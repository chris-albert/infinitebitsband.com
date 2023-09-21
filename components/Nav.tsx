import React from 'react'
import {AppBar, Box, Toolbar, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Link from 'next/link'
import Image from "next/image";
// import headerLogo from "../public/images/logo-long-20.png"
import headerLogo from "../public/images/logos/main-big-0.png"
import { useRouter } from 'next/router'
import _ from 'lodash'
import {Pages} from "./Pages";

export type NavProps = {}

export const Nav: React.FC<NavProps> = ({}) => {

  const router = useRouter()
  const [navOpen, setNavOpen] = React.useState(false)

  const showHamburger = false

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
            {_.map(Pages, (page, name) => (
              <ListItem key={name} disablePadding>
                <ListItemButton
                  onClick={() => {
                    router.push(`/${name}`)
                    setNavOpen(false)
                  }}
                >
                  <ListItemText primary={name} />
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
            {showHamburger ? (
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={() => setNavOpen(true)}
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
            ): null}
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              cursor: 'pointer'
            }}
            onClick = {() => {
              router.push('/')
            }}
          >
              <Image src={headerLogo} height={50} alt="logo" />
          </Box>
          <Box></Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}
