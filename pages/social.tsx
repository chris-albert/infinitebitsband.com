import React from 'react'
import {Grid} from "@mui/material";
import Image from 'next/image'
import Instagram from '../public/images/social/instagram.png'
import Spotify from '../public/images/social/spotify.png'
import YouTube from '../public/images/social/youtube.png'
import Soundcloud from '../public/images/social/soundcloud.png'
import Bandcamp from '../public/images/social/bandcamp.png'
import {CardLink} from "../components/CardLink";

const imageHeight = 45

export type SocialProps = {}

const Social: React.FC<SocialProps> = ({}) => {

  return (
    <Grid
      item
      container
      spacing={2}
      justifyContent='center'
    >
      <Grid item>
        <CardLink href={'https://www.instagram.com/infinite_bits_band/'}>
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
        <CardLink href={'https://soundcloud.com/infinite-bits'}>
          <Image
            height={imageHeight}
            src={Soundcloud}
            alt='Audios'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink href={'https://infinitebits.bandcamp.com/album/infinite-bits-ep'}>
          <Image
            height={imageHeight}
            src={Bandcamp}
            alt='Bandcamp'
          />
        </CardLink>
      </Grid>
      <Grid item>
        <CardLink href={'https://www.youtube.com/channel/UCFdMVO3JBoVVtgP9l0r_eVA'}>
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

export default Social
