"use client"
import { Button } from '@radix-ui/themes'
import { signOut } from 'next-auth/react'
import { redirect } from 'next/dist/server/api-utils'
import React from 'react'

const UserAccountNav = () => {
  return (
    <Button onClick={() => signOut({
        redirect: true,
        callbackUrl: `${window.location.origin}/login`
    }
    )}>Sair</Button>
  )
}

export default UserAccountNav
