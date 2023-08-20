import React from 'react'
import {Card, CardContent, Divider, Typography, Box} from "@mui/material";

export type VideoProps = {}

const Videos: React.FC<VideoProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            videos
          </Typography>
        </Divider>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <iframe width="560" height="315"
                  src="https://www.youtube.com/embed/videoseries?list=PLueshm9D3Q92631shAwMDVikWEMMpnxyB"
                  title="YouTube video player" frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen></iframe>
        </Box>
      </CardContent>
    </Card>
  )
}

export default Videos