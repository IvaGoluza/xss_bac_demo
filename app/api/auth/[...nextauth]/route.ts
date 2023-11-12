import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'


export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt'
  },
  providers: [
    CredentialsProvider({
      name: 'email',
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'name@email.com'
        },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials, req) {
        const isVulnerable = req?.headers?.cookie?.includes('isVulnerable=true');

        if (!credentials?.email || !credentials.password) {
          return null
        }

        if (credentials.email === "admin@web.hr" && credentials.password === "1234") {    // represents admin user in 'database' -> for demonstration of admin user experience
          return { id: "1", name: "Admin", email:credentials.email, role:"ADMIN", isVulnerable:isVulnerable}
        } else {             // for this vulnerability demonstration every new user has BASIC role by default
          return { id: "1", name: "User", email:credentials.email, role:"BASIC", isVulnerable:isVulnerable}
        }
      }
    })
  ],
  callbacks: {
    session: ({ session, token }) => {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          role: token.role,
          isVulnerable: token.isVulnerable
        }
      }
    },
    jwt: ({ token, user }) => {   // this will be called before session callback
      if (user) {
        const u = user as any
        return {
          ...token,
          id: u.id,
          role: u.role,    // adding role into token  -> this will be passed into session callback
          isVulnerable: u.isVulnerable
        }
      }
      return token    
    }
  }
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }