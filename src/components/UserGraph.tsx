import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { formatDate, getRecentWednesdays } from '../dateUtil'
import { useData } from '../firebase/contexts/data'

interface Props {
  userId: string
}

function UserGraph({ userId }: Props) {
  const { users, ratings } = useData()
  const userKeys = users && users[userId] && users[userId].ratings || {}
  const userKeyId = Object.keys(userKeys)
  const userRatings = ratings && ratings[userId] || {}

  const recentDates = getRecentWednesdays()
  const data = recentDates.map((d) => {
    const date = formatDate.firebaseToDisplay(d)

    return {
      date,
      ...userRatings[d]
    }
  })


  const chartCols = ["#8884d8","#82ca9d", "#ffc658", "#d88484", "#ca82d1", "#84d8d6"]
  return (
    // <ResponsiveContainer
    // // width="90px"
    // // height="250px"
    // >
      <LineChart
       width={730} height={250}
        data={data}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="2" />
        <XAxis dataKey="date" padding={{ left: 30, right: 30 }} />
        <YAxis domain={[0,5]} tickCount={6} />
        <Tooltip />
        <Legend />
        {userKeyId.map((id, idx) => (
          <Line key={id}
            name={userKeys[id].text}
            type="monotone"
            dataKey={id}
            stroke={userKeys[id].col || chartCols[idx % chartCols.length]}
            strokeWidth={1.5}
            connectNulls={true}
          />
        ))}
      </LineChart>
    // </ResponsiveContainer>
  )
}

export default UserGraph
