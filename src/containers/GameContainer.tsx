import { BACKEND_URL } from 'constant'
import { Box, Grid, Modal, Paper, Typography } from '@mui/material'
import { CashOutButton, CreditsBanner, PlayButton, Slot } from 'components'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import { Symbol } from 'interfaces'

const modalStyle = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #175fc7',
  borderRadius: '12px',
  boxShadow: 24,
  p: 4
}

interface GameContainerProps {
  currentCredits: number
  initialSymbols: Array<Symbol>
  updateCredits: Dispatch<SetStateAction<number>>
  changeAuthStatus: Dispatch<SetStateAction<boolean>>
}

export default function GameContainer({
  currentCredits,
  initialSymbols,
  updateCredits,
  changeAuthStatus
}: GameContainerProps) {
  const [creditsModal, setCreditsModal] = useState(false)
  const [errorModal, setErrorModal] = useState(false)
  const [loadingGame, setLoadingGame] = useState(false)
  const [initialFlag, setInitialFlag] = useState(true)
  const [currentSymbols, setCurrentSymbols] = useState(
    initialSymbols.slice(0, 3)
  )

  const handlePlay = async () => {
    if (!currentCredits) setCreditsModal(true)
    setLoadingGame(true)
    const gameResponse = await fetch(`${BACKEND_URL}/game/play`, {
      method: 'GET'
    })
    if (gameResponse.status === 402) {
      setLoadingGame(false)
      return setCreditsModal(true)
    }
    if (!gameResponse.ok) {
      setLoadingGame(false)
      return setErrorModal(true)
    }
    setInitialFlag(false)
    const parsedGameResponse: { credits: number; result: Symbol[] } =
      await gameResponse.json()
    const { credits, result } = parsedGameResponse
    updateCredits(credits)
    setCurrentSymbols(result)
    setLoadingGame(false)
  }

  const handleCashOut = async () => {
    const logoutResponse = await fetch(`${BACKEND_URL}/auth/logout`, {
      method: 'POST'
    })
    if (logoutResponse.ok) return changeAuthStatus(false)
    return setErrorModal(true)
  }

  return (
    <Fragment>
      <Paper elevation={3} sx={{ backgroundColor: '#175fc7', height: '100%' }}>
        <Grid container p={2} spacing={2} height="100%">
          {loadingGame &&
            new Array(3)
              .fill(1)
              .map((_, idx) => (
                <Slot key={`loading-symbol-${idx}`} loading />
              ))}
          {currentSymbols.map((symbol, idx) => (
            <Slot
              key={`symbol-${symbol.id}`}
              symbol={symbol}
              initialFlag={initialFlag}
              waitTime={idx + 1}
            />
          ))}
        </Grid>
      </Paper>
      <Box p={2}>
        <CreditsBanner credits={currentCredits} />
      </Box>
      <Modal
        open={creditsModal}
        onClose={() => setCreditsModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            No credits to play 😢
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please visit our cashiers to get more credits!
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={errorModal}
        onClose={() => setErrorModal(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Something went wrong 🚫
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Please try again
          </Typography>
        </Box>
      </Modal>
      <PlayButton handlePlay={handlePlay} />
      <CashOutButton handleCashOut={handleCashOut} />
    </Fragment>
  )
}
