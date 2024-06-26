import React from 'react'
import {Card, CardContent, Divider, Typography, Link, Box} from "@mui/material";
import {Event} from '../components/Event'

export type EventsProps = {}

const Events: React.FC<EventsProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            events
          </Typography>
        </Divider>
        {/*<Divider sx={{mb: 2}}/>*/}
        <Event
          date='april 26 2024 9pm'
          venue='ocaean ale house'
          location='1314 Ocean Ave'
        >
          <Box sx={{mb: 2}}>
            <Link href="https://oceanalehouse.com/">oceanalehouse.com</Link>
          </Box>
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12623.222602770975!2d-122.4567663!3d37.7242395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7dd2928536ff%3A0xcd07c83f8c7aef04!2sOcean%20Ale%20House!5e0!3m2!1sen!2sus!4v1709077929486!5m2!1sen!2sus"
              width="600" height="450" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Event>
        <Event
          date='june 7 2024 9pm'
          venue='ocaean ale house'
          location='1314 Ocean Ave'
        >
          <Box sx={{mb: 2}}>
            <Link href="https://oceanalehouse.com/">oceanalehouse.com</Link>
          </Box>
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12623.222602770975!2d-122.4567663!3d37.7242395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7dd2928536ff%3A0xcd07c83f8c7aef04!2sOcean%20Ale%20House!5e0!3m2!1sen!2sus!4v1709077929486!5m2!1sen!2sus"
              width="600" height="450" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Event>
        <Divider textAlign="center" sx={{mb: 2, mt: 2}}>
          <Typography variant="h6" component="div" >
            past
          </Typography>
        </Divider>
        <Event
          date='march 3 2024 2pm'
          venue='ocaean ale house'
          location='1314 Ocean Ave'
        >
          <Box sx={{mb: 2}}>
            <Link href="https://oceanalehouse.com/">oceanalehouse.com</Link>
          </Box>
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d12623.222602770975!2d-122.4567663!3d37.7242395!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f7dd2928536ff%3A0xcd07c83f8c7aef04!2sOcean%20Ale%20House!5e0!3m2!1sen!2sus!4v1709077929486!5m2!1sen!2sus"
              width="600" height="450" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Event>
        <Event
          date='july 15 2023 8pm'
          venue='the bistro'
          location='hayward, ca'
        >
          <Box sx={{mb: 2}}>
            <Link href="https://the-bistro.com">the-bistro.com</Link>
          </Box>
          <Box>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3157.9937050793374!2d-122.082441!3d37.67285570000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x808f93d842a990a1%3A0xba17404643e83d30!2s1001%20B%20St%2C%20Hayward%2C%20CA%2094541!5e0!3m2!1sen!2sus!4v1686349606039!5m2!1sen!2sus"
              width="600" height="450" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"></iframe>
          </Box>
        </Event>
        <Event
          date='may 20 2023 8pm'
          venue='magarian basement'
          location='alameda, ca'
        >
        </Event>
      </CardContent>
    </Card>
  )
}

export default Events
