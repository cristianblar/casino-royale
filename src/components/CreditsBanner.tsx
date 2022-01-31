import { Typography } from '@mui/material'

interface CreditsBannerProps {
  credits: number
}

export default function CreditsBanner({ credits }: CreditsBannerProps) {
  return (
    <Typography variant="h5">
      <strong>Credits:</strong> {credits}
    </Typography>
  )
}
