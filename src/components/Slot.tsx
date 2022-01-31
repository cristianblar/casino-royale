import { Box, Grid, Paper } from '@mui/material'
import { Symbol } from 'interfaces'
import slotLoader from 'assets/ball-slot-loader.svg'
import { useEffect, useState } from 'react'

interface SlotProps {
  symbol?: Symbol
  loading?: boolean
  initialFlag?: boolean
  waitTime?: number
}

export default function Slot({
  initialFlag,
  loading,
  symbol,
  waitTime
}: SlotProps) {
  const [waitingSymbol, setWaitingSymbol] = useState<Symbol | null>(null)

  useEffect(() => {
    if (!initialFlag && waitTime && symbol)
      setTimeout(() => setWaitingSymbol(symbol), waitTime * 1000)
    else setWaitingSymbol(null)
  }, [symbol])

  return (
    <Grid item xs={4} height="100%">
      <Paper elevation={1} sx={{ height: '100%' }}>
        <Box
          height="100%"
          width="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          {(loading || (!initialFlag && !waitingSymbol)) && (
            <img src={slotLoader} alt="Bouncing loader" />
          )}
          {initialFlag && symbol && <img src={symbol.url} alt="Slot fruit" />}
          {!initialFlag && waitingSymbol && (
            <img src={waitingSymbol.url} alt="Slot fruit" />
          )}
        </Box>
      </Paper>
    </Grid>
  )
}
