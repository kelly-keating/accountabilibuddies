import { createBrowserRouter } from 'react-router-dom'

import Dash from './components/Dash'
import Goals from './components/Goals'
import Main from './components/Main'

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dash />,
    children: [
      { index: true, element: <Main /> },
      { path: "goals", element: <Goals /> },
    ]
  }
])

export default router
