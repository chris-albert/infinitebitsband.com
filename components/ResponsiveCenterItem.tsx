import React from 'react'
import {Grid, Box} from "@mui/material";

export type ResponsiveCenterItemProps = {
  children?: React.ReactNode
}

export const ResponsiveCenterItem: React.FC<ResponsiveCenterItemProps> = ({
  children
}) => {

  return (
    <Grid container>
      <Grid item xs></Grid>
      <Grid
        item
        xs={12}
        sm={11}
        md={10}
        lg={9}
        xl={8}
        columnSpacing={2}
      >
        {children}
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  )
}
