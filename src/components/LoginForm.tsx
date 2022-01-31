import { BACKEND_URL } from 'constant'
import { Box, Button, Paper, TextField, Typography } from '@mui/material'
import {
  ChangeEvent,
  Dispatch,
  FocusEvent,
  FormEvent,
  SetStateAction,
  useState
} from 'react'
import { Symbol } from 'interfaces'

interface LoginFormProps {
  changeAuthStatus: Dispatch<SetStateAction<boolean>>
  setCurrentCredits: Dispatch<SetStateAction<number>>
  setInitialSymbols: Dispatch<SetStateAction<Array<Symbol>>>
}

export default function LoginForm({
  changeAuthStatus,
  setCurrentCredits,
  setInitialSymbols
}: LoginFormProps) {
  const [loginError, setLoginError] = useState(false)
  const [formData, setFormData] = useState({
    national_id: { value: '', error: false },
    password: { value: '', error: false }
  })

  const handleChange = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) =>
    setFormData(currentData => ({
      ...currentData,
      [e.target.name]: {
        value:
          e.target.name === 'national_id'
            ? e.target.value.trim()
            : e.target.value,
        error: false
      }
    }))

  const handleError = (
    e: FocusEvent<HTMLTextAreaElement | HTMLInputElement, Element>
  ) =>
    setFormData(currentData => ({
      ...currentData,
      [e.target.name]: {
        value: currentData[e.target.name as keyof typeof formData].value,
        error:
          e.target.name === 'national_id'
            ? e.target.value.length < 6
            : e.target.value.length < 8
      }
    }))

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (formData.national_id.error || formData.password.error) return
    const dataToSend = new URLSearchParams({
      national_id: formData.national_id.value,
      password: formData.password.value
    })
    const authResponse = await fetch(`${BACKEND_URL}/auth/signup-signin`, {
      credentials: 'include',
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      method: 'POST',
      body: dataToSend.toString()
    })
    if (!authResponse.ok) return setLoginError(true)
    const { credits, symbols }: { credits: number; symbols: Array<Symbol> } =
      await authResponse.json()
    setCurrentCredits(credits)
    setInitialSymbols(symbols)
    return changeAuthStatus(true)
  }

  return (
    <Paper elevation={3}>
      <Box p={2} pt={4}>
        <Typography variant="h6">Sign in or Sign up!</Typography>
      </Box>
      <Box pt={2} pb={4} px={8}>
        <form onSubmit={handleSubmit} autoComplete="off" spellCheck={false}>
          <Box mb={4}>
            <TextField
              fullWidth
              required
              value={formData.national_id.value}
              onChange={handleChange}
              onBlur={handleError}
              name="national_id"
              error={formData.national_id.error}
              id={
                formData.national_id.error
                  ? 'outlined-error-helper-text'
                  : 'outlined-required'
              }
              helperText={
                formData.national_id.error
                  ? 'At least 6 characters required'
                  : null
              }
              label="National ID"
            />
          </Box>
          <Box mb={4}>
            <TextField
              fullWidth
              required
              value={formData.password.value}
              onChange={handleChange}
              onBlur={handleError}
              name="password"
              type="password"
              error={formData.password.error}
              id={
                formData.password.error
                  ? 'outlined-error-helper-text'
                  : 'outlined-required'
              }
              helperText={
                formData.password.error
                  ? 'At least 8 characters required'
                  : null
              }
              label="Password"
            />
          </Box>
          {loginError && (
            <Box pt={2}>
              <Typography color="red" variant="body1">
                Something went wrong, please try again
              </Typography>
            </Box>
          )}
          <Box pt={2}>
            <Button type="submit" variant="contained" size="large">
              GO
            </Button>
          </Box>
        </form>
      </Box>
    </Paper>
  )
}
