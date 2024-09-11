import { createBrowserRouter } from 'react-router-dom'

import Dash from './components/Dash'
import Goals from './components/Goals/Goals'
import Main from './components/HomePage/Main'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Dash />,
    children: [
      { index: true, element: <Main /> },
      { path: 'goals/:id', element: <Goals /> },
    ],
  },
])
// TODO: add redirect to home on bogus link
// TODO: add redirect to your goals on /goals

export default router
