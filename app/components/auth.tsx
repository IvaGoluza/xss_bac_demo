'use client'

import { signIn, signOut } from 'next-auth/react'

export const LoginButton = () => {
  return <button className='my-3 border border-white text-white font-medium py-2 px-3 rounded-md text-sm  hover:border-green-400 hover:text-green-400' onClick={() => signIn().then()}>Sign in</button>
}

export const LogoutButton = () => {
  return <button className='my-3 border border-white text-white font-medium py-2 px-3 rounded-md text-sm  hover:border-green-400 hover:text-green-400'  onClick={() => signOut()}>Sign Out</button>
}