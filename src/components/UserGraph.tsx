import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatDate, getRecentWednesdays } from '../dateUtils'
import { useData } from '../firebase/contexts/data'
import { getGenericColour } from '../colourUtils'

interface Props {
  userId: string
}

function UserGraph({ userId }: Props) {
  const { users, ratings } = useData()
  const userKeys = (users && users[userId] && users[userId].ratings) || {}
  const userKeyId = Object.keys(userKeys)
  const userRatings = (ratings && ratings[userId]) || {}

  const recentDates = getRecentWednesdays()
  const data = recentDates.map((d, idx) => {
    const date = idx === 0 ? 'This Week' : formatDate.firebaseToDisplay(d)

    return {
      date,
      ...userRatings[d],
    }
  })

  return (
    <LineChart
      width={730}
      height={250}
      data={data}
    >
      <CartesianGrid strokeDasharray="2" />
      <XAxis dataKey="date" padding={{ left: 30 }} />
      <YAxis domain={[0, 5]} tickCount={6} />
      <Tooltip />
      <Legend />
      {userKeyId.map((id, idx) => (
        <Line
          key={id}
          name={userKeys[id].text}
          type="monotone"
          dataKey={id}
          stroke={userKeys[id].col || getGenericColour(idx)}
          strokeWidth={1.5}
          connectNulls={true}
        />
      ))}
    </LineChart>
  )
}

export default UserGraph
