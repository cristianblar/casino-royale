import { Box } from '@mui/material'
import { GameContainer } from 'containers'
import { Header, LoginForm, MainLoader } from 'components'
import { useSession } from 'hooks'
import { useState } from 'react'

export default function App() {
  const { authenticated, changeAuthStatus, loading } = useSession()
  const [currentCredits, setCurrentCredits] = useState(0)
  const [initialSymbols, setInitialSymbols] = useState([] as Array<unknown>)

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
        <Box>
          <GameContainer
            currentCredits={currentCredits}
            initialSymbols={initialSymbols}
            changeAuthStatus={changeAuthStatus}
          />
        </Box>
      )}
    </Box>
  )
}
