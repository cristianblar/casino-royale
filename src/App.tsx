import { Box } from '@mui/material'
import { GameContainer } from 'containers'
import { Header, LoginForm, MainLoader } from 'components'
import { useSession } from 'hooks'
import { useState } from 'react'
import { Symbol } from 'interfaces'

export default function App() {
  const { authenticated, changeAuthStatus, loading } = useSession()
  const [currentCredits, setCurrentCredits] = useState(0)
  const [initialSymbols, setInitialSymbols] = useState([] as Array<Symbol>)

  return (
    <Box>
      <Header />
      {loading && (
        <Box mt={12} textAlign="center">
          <MainLoader />
        </Box>
      )}
      {!loading && !authenticated && (
        <Box mt={8} width="80%" mx="auto" textAlign="center">
          <LoginForm
            changeAuthStatus={changeAuthStatus}
            setCurrentCredits={setCurrentCredits}
            setInitialSymbols={setInitialSymbols}
          />
        </Box>
      )}
      {!loading && !!initialSymbols.length && authenticated && (
        <Box
          mt={8}
          height="40vh"
          minHeight="200px"
          width="90%"
          mx="auto"
          textAlign="center"
        >
          <GameContainer
            currentCredits={currentCredits}
            initialSymbols={initialSymbols}
            changeAuthStatus={changeAuthStatus}
            updateCredits={setCurrentCredits}
          />
        </Box>
      )}
    </Box>
  )
}
