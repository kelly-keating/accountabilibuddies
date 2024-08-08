import { createRoot } from 'react-dom/client'
import { ChakraProvider } from '@chakra-ui/react'

import './firebase' // initialises the firebase connection - do not remove

import Dash from './components/Dash'
import { AuthProvider } from './firebase/contexts/auth'

document.addEventListener('DOMContentLoaded', () => {
  createRoot(document.getElementById('app') as HTMLElement).render(
    <AuthProvider>
      <ChakraProvider>
        <Dash />
      </ChakraProvider>
    </AuthProvider>
  )
})
