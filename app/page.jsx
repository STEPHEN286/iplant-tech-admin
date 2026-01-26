"use client"

import { useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
// import { useAuth } from "@/hooks/useAuth"

export default function HomePage() {
  const router = useRouter()
  // const { isAuthenticated, isLoading, isInitialized } = useAuth()

  // This page should never be reached due to middleware redirects
  // But we'll keep it as a fallback
  // useEffect(() => {
  //   if (isInitialized && !isLoading) {
  //     if (isAuthenticated) {
  //       router.push("/dashboard")
  //     } else {
  //       router.push("/login")
  //     }
  //   }
  // }, [isAuthenticated, isLoading, isInitialized, router])

  return (
    // <div className="min-h-screen flex items-center justify-center">
    //   <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
    // </div>
    redirect("/dashboard")
  )
}
