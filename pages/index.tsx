import { GetStaticProps } from 'next'
import {Home} from '../components/Home'

export default function Index({}) {
  return (
    <Home />
  )
}

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {}
  }
}
