import React from 'react'
import {Box, Paper} from "@mui/material";
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
      <Box
        sx={{
          ...sx,
          cursor: 'pointer',
          lineHeight: 0
        }}
      >
        {children}
      </Box>
    </Link>

  )
}
