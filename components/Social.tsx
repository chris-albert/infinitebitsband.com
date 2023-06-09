import React from 'react'
import {Box, Card, CardContent, Grid} from "@mui/material";
import Image from 'next/image'
import Instagram from '../public/images/instagram.png'
import Spotify from '../public/images/spotify.png'
import YouTube from '../public/images/youtube.png'
import Soundcloud from '../public/images/soundcloud.png'
import Bandcamp from '../public/images/bandcamp.png'
import {CardLink} from "./CardLink";

const imageHeight = 45

export type SocialProps = {}

export const Social: React.FC<SocialProps> = ({}) => {

  return (
    <Grid
      container
      sx={{py: 2, mt: 1}}
      spacing={2}
    >
      <Grid item>
        <CardLink href={''}>
          <Image
            height={imageHeight}
            src={Instagram}
            alt='instagram'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink href={'https://open.spotify.com/album/5NZS1vqyGWnDUmdujgdP05?si=62oa7Bh4Qv6FYyu0wzu0yQ'}>
          <Image
            height={imageHeight}
            src={Spotify}
            alt='Spotify'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink sx={{pr: 2}} href={'https://soundcloud.com/infinite-bits'}>
          <Image
            height={imageHeight}
            src={Soundcloud}
            alt='Soundcloud'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink sx={{pr: 2}} href={'https://infinitebits.bandcamp.com/album/infinite-bits-ep'}>
          <Image
            height={imageHeight}
            src={Bandcamp}
            alt='Bandcamp'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink href={''}>
          <Image
            height={imageHeight}
            src={YouTube}
            alt='Youtube'
          />
        </CardLink>
      </Grid>
    </Grid>
  )
}
