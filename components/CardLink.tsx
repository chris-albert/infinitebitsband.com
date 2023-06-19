import React from 'react'
import {Card, CardContent} from "@mui/material";
import Link from 'next/link'
import { styled } from '@mui/material/styles';

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
      <Card
        sx={{
          ...sx,
          cursor: 'pointer',
          border: '1px solid transparent',
          lineHeight: 0,
          '&:hover': {
            border: '1px solid white'
          }
        }}
      >
        <CardContent
          sx={{
            p: 0,
            pb: '0px !important'
          }}>
          {children}
        </CardContent>
      </Card>
    </Link>

  )
}
