import { useEffect, useState } from 'react'
import { getUserId } from '../firebase/auth'
import { useData } from '../firebase/contexts/data'
import { RatingKeys } from '../models'
import { getNextWednesday } from '../dateUtils'
import { Box, Heading, Slider, SliderFilledTrack, SliderThumb, SliderTrack, Text } from '@chakra-ui/react'
import { getGenericColour, lightenColor } from '../colourUtils'
import { updateRatingThisWeek } from '../firebase/db'

function ThisWeek() {
  const {users, ratings} = useData()
  const uid = getUserId()

  const [currentRatings, setCurrentRatings] = useState<Record<string, number>>({})
  useEffect(() => {
    if(ratings && uid){
      const userRatings = ratings[uid] || {}
      const newRatings = userRatings[getNextWednesday()]
      if (newRatings) setCurrentRatings(newRatings)
    }
  }, [ratings, uid])

  if(!users || !uid) return null

  const usersActiveRatings = (Object.values(users[uid].ratings) as RatingKeys[]).filter((r) => r.current)

  return (
    <>
      <Heading as="h2" size="md">This Week</Heading>
      {usersActiveRatings.map((rating, idx) => {
        const col = rating.col || getGenericColour(idx)
        const lightCol = lightenColor(col, 40)
        
        const displayVal = currentRatings[rating.id] || 2

        const updateRating = (val: number) => {
          updateRatingThisWeek(rating.id, val)
        }

        return (
          <Box key={rating.id}>
            <Text>{rating.text}: {currentRatings[rating.id] || "-"}</Text>
            <Box m="20px">
              <Slider onChange={updateRating} onClick={() => updateRating(displayVal)} defaultValue={displayVal} min={1} max={5} step={1}>
                <SliderTrack bg={lightCol}>
                  <SliderFilledTrack bg={lightCol} />
                </SliderTrack>
                <SliderThumb bg={col} boxSize={6} />
              </Slider>
            </Box>
          </Box>
        )
      })}
    </>
  )
}

export default ThisWeek
