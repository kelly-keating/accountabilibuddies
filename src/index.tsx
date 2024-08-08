import './firebase' // initialises the firebase connection - do not remove
import { createRoot } from 'react-dom/client'

import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from './firebase/contexts/auth'
import { DataProvider } from './firebase/contexts/data'

import Dash from './components/Dash'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AuthProvider>
      <DataProvider>
        <ChakraProvider>
          <Dash />
        </ChakraProvider>
      </DataProvider>
    </AuthProvider>
  )
})
