import React from 'react'
import {Box, Card, CardContent, Divider, Typography} from "@mui/material";

export type CobandmentsProps = {}

export const Cobandments: React.FC<CobandmentsProps> = ({}) => {

  return (
    <Card>
      <CardContent sx={{
        pb: '16px!important'
      }}>
        <Divider textAlign="left" sx={{mb: 2}}>
          <Typography variant="h6" component="div" >
            cobandments
          </Typography>
        </Divider>
        <Box>
          <ol>
            <li>The computer shall not play audio (only midi)</li>
            <li>You shall not sit dormant for more than 1 phrase</li>
            <li>The instrument shall not play ye</li>
          </ol>
        </Box>
      </CardContent>
    </Card>
  )
}
