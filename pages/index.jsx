import {Auth, ThemeSupa} from '@supabase/auth-ui-react'
import {useSession, useSupabaseClient} from '@supabase/auth-helpers-react'
import Account from '../components/Account'
import Link from 'next/link'

const Home = () => {
  const session = useSession()
  const supabase = useSupabaseClient()

  return (
    <>
      <div className='container'>
        <h2>Supabase Example Project</h2>
        <Link href='/Admin'>Admin Page</Link>
      </div>

      <div className="container" style={{padding: '50px 0 100px 0'}}>

        {
          !session ? (
            <Auth supabaseClient={supabase} appearance={{theme: ThemeSupa}} theme="dark" />
          ) : (
            <Account session={session} />
          )
        }
      </div>
    </>
  )
}

export default Home