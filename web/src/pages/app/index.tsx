import { GetServerSideProps } from "next"
import { Session, getSession, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { useUser } from "@auth0/nextjs-auth0/client"
import Link from "next/link"

export default function Home() {
  const { user } = useUser()
  return (
    <div>
      <h1>Hello!</h1>
      <pre>
        {JSON.stringify(user, null, 2)}
      </pre>

      <Link href="/api/auth/logout">Logout</Link>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired()
