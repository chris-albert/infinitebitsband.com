import React from 'react'
import {Paper} from "@mui/material";
import Link from 'next/link'

export type CardLinkProps = {
  children: React.ReactElement,
  href: string
  sx?: any
}

export const CardLink: React.FC<CardLinkProps> = ({
  children,
  href,
  sx
}) => {
  return (
    <Link href={href}>
      <Paper
        sx={{
          ...sx,
          cursor: 'pointer',
          lineHeight: 0,
          backgroundColor: 'rgba(0,0,0,0)',
          backgroundImage: `linear-gradient(45deg, rgba(16, 81, 145, .4), rgba(143, 19, 66, .4))`,
          '&:hover': {
            border: '1px solid white',
            margin: '-1px'
          }
        }}
      >
        {children}
      </Paper>
    </Link>

  )
}
