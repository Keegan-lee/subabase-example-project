import {useState, useEffect} from 'react'
import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient, useUser} from '@supabase/auth-helpers-react'
import { useRouter } from 'next/router'

const Admin = () => {

  const router = useRouter();
  const session = useSession()
  const supabase = useSupabaseClient()
  const user = useUser()

  // This is our local state for the Admin Page
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState(null)
  const [website, setWebsite] = useState(null)
  const [avatar_url, setAvatarUrl] = useState(null)
  const [roles, setRoles] = useState(null)

  useEffect(() => {
    session && getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)

      let {data, error, status} = await supabase
        .from('profiles')
        .select(`username, website, avatar_url, roles`)
        .eq('id', user.id)
        .single()

      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
        setRoles(data.roles)
      }

      if (data.roles.indexOf('Admin') === -1) {
        router.push('/');
      }

    } catch (error) {
      alert('Error loading user data!')
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {loading && <p>loading ... </p>}
      {
        session && roles && roles.indexOf('Admin') !== -1 &&
        <p>This is Admin content</p>
      }
    </>
  )
}

export default Admin