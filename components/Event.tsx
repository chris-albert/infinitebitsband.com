import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {Divider} from "@mui/material";

export type EventProps = {
  date: string
  venue: string
  location: string
  children?: React.ReactNode
}

export const Event: React.FC<EventProps> = ({
  date,
  venue,
  location,
  children
}) => {

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>{date} - {venue} - {location}</Typography>
      </AccordionSummary>
      <Divider/>
      <AccordionDetails>
        {children}
      </AccordionDetails>
    </Accordion>
  )
}
