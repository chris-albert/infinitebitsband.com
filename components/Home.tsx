import React from 'react'
import {Social} from "./Social";
import {Box, Grid} from "@mui/material";
import {Soundcloud} from "./Soundcloud";
import {ResponsiveCenterItem} from "./ResponsiveCenterItem";

export type HomeProps = {}

export const Home: React.FC<HomeProps> = ({}) => {

  return (
    <Grid container spacing={2}>
      <ResponsiveCenterItem>
        <Social />
        <Soundcloud />
      </ResponsiveCenterItem>

    </Grid>
  )
}
