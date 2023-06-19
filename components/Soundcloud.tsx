import React from 'react'
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

export type SoundcloudProps = {}

export const Soundcloud: React.FC<SoundcloudProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            audios
          </Typography>
        </Divider>
        <iframe
          width="100%"
          height="400"
          scrolling="no"
          frameBorder="no"
          allow="autoplay"
          src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/playlists/1632291169&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"
        />
      </CardContent>
    </Card>
  )
}
