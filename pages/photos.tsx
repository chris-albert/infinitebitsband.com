import React from 'react'
import Carousel from 'react-material-ui-carousel'
import {Card, CardContent, Box, Typography, Divider} from "@mui/material";
import Image from 'next/image'
import FirstShow1 from '../public/images/photos/first-show-1.jpg'
import FirstShow2 from '../public/images/photos/first-show-2.jpg'
import LogoVertNeg from '../public/images/logo-vert-20.png'
import LogoVert from '../public/images/logo-vert-20-neg.png'

export type PhotosProps = {}

const Photos: React.FC<PhotosProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            photos
          </Typography>
        </Divider>
        <Carousel
          navButtonsAlwaysVisible
        >
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={FirstShow2}
              height={500}
              alt=''
            />
          </Box>

          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={FirstShow1}
              height={500}
              alt=''
            />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={LogoVertNeg}
              height={500}
              alt=''
            />
          </Box>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Image
              src={LogoVert}
              height={500}
              alt=''
            />
          </Box>
        </Carousel>
      </CardContent>
    </Card>
  )
}

export default Photos

// export const getStaticProps = () => {}