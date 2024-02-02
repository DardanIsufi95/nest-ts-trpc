"use client"

import { signOut } from "next-auth/react";

    
export function LogoutButton(props: { name?: string | null ; }) {
    
  return (
    <button onClick={()=>signOut()}>Logout {props.name}</button>
  )
}