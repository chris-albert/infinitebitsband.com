import React from 'react'
import {Grid} from "@mui/material";

export type ResponsiveCenterItemProps = {
  children?: React.ReactNode
}

export const ResponsiveCenterItem: React.FC<ResponsiveCenterItemProps> = ({
  children
}) => {

  return (
    <Grid container xs={12}>
      <Grid item xs></Grid>
      <Grid
        item
        xs={12}
        sm={11}
        md={10}
        lg={7}
        xl={7}
      >
        {children}
      </Grid>
      <Grid item xs></Grid>
    </Grid>
  )
}
