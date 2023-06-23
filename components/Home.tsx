import React from 'react'
import {Social} from "./Social";
import {Grid, Box} from "@mui/material";
import {Soundcloud} from "./Soundcloud";
import {ResponsiveCenterItem} from "./ResponsiveCenterItem";
import {Events} from "./Events";
import {Photos} from "./Photos";
import {Video} from "./Video";

export type HomeProps = {}

export const Home: React.FC<HomeProps> = ({}) => {

  return (
    <Grid container spacing={0} >
      <ResponsiveCenterItem>
        <Box sx={{py: 1}}/>
        <Social />
        <Box sx={{py: 1}}/>
        <Soundcloud />
        <Box sx={{py: 1}}/>
        <Video />
        <Box sx={{py: 1}}/>
        <Events />
        <Box sx={{py: 1}}/>
        <Photos />
      </ResponsiveCenterItem>

    </Grid>
  )
}
