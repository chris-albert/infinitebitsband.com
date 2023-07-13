import React from 'react'
import {Box} from "@mui/material";
import {Pages} from "./Pages";
import _ from "lodash";

export type HomeProps = {}

export const Home: React.FC<HomeProps> = ({}) => {

  return (
    <Box>
      {_.map(Pages, (page, name) => (
        <Box key={`page-${name}`}>
          {page()}
          <Box sx={{py: 1}}/>
        </Box>
      ))}
    </Box>
  )
}
