import { useEffect, useState } from 'react'
import { BACKEND_URL } from 'constant'

export default function useSession() {
  const [loading, setLoading] = useState(false)
  const [authenticated, setAuthenticated] = useState(false)

  useEffect(() => {
    async function checkStatus() {
      const checkFetch = await fetch(`${BACKEND_URL}/auth/check-status`, {
        credentials: 'include',
        headers: { Accept: '*/*' },
        method: 'GET'
      })
      if (checkFetch.ok && !authenticated) setAuthenticated(true)
      if (!checkFetch.ok && authenticated) setAuthenticated(false)
    }
    setLoading(true)
    checkStatus().then(() => setLoading(false))
  }, [authenticated])

  return { loading, authenticated, changeAuthStatus: setAuthenticated }
}
