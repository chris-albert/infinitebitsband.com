import React from 'react'
import { useRouter } from 'next/router'
import {Box} from "@mui/material";
import {Pages} from "../components/Pages";

export type PageProps = {}

const Page: React.FC<PageProps> = ({}) => {

  const router = useRouter()

  const [page, setPage] = React.useState<React.ReactElement | undefined>(undefined)

  React.useEffect(() => {
    if(router.query.slug) {
      const slug = typeof router.query.slug === 'string' ?
        router.query.slug :
        router.query.slug.join('')
      const maybePage = Pages[slug]
      if(maybePage !== undefined) {
        setPage(maybePage())
      }
    }
  }, [router.query.slug])

  if(page === undefined) {
    return (
      <Box
        sx={{
          textAlign: 'center',
        }}
      >
        Unknown page {router.query.slug}
      </Box>
    )
  } else {
    return (
      <Box>
        {page}
      </Box>
    )
  }

}

export default Page
