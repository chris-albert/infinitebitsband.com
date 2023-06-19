import React from 'react'
import {Social} from "./Social";
import {Divider, Grid} from "@mui/material";
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
        <Divider sx={{py: 1}}/>
        <Social />
        <Divider sx={{py: 1}}/>
        <Soundcloud />
        <Divider sx={{py: 1}}/>
        <Video />
        <Divider sx={{py: 1}}/>
        <Events />
        <Divider sx={{py: 1}}/>
        <Photos />
      </ResponsiveCenterItem>

    </Grid>
  )
}
