import './firebase' // initialises the firebase connection - do not remove
import { createRoot } from 'react-dom/client'

import { RouterProvider } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './firebase/contexts/auth'
import { DataProvider } from './firebase/contexts/data'

import router from './router'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>
          <RouterProvider router={router} />
        </ChakraProvider>
      </DataProvider>
    </AuthProvider>,
  )
})
