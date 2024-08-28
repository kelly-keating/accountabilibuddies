import { Divider } from '@chakra-ui/react'

import GraphDisplayList from './GraphDisplayList'
import ThisWeek from './ThisWeek'

function Main() {
  return (
    <>
      <ThisWeek />
      <Divider marginY="20px" />
      <GraphDisplayList />
    </>
  )
}

export default Main
