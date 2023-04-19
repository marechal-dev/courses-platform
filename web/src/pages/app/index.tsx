import { GetServerSideProps } from "next"
import { withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useUser } from "@auth0/nextjs-auth0/client"

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      <h1>Hello!</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <a href="/api/auth/logout">Logout</a>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired()
