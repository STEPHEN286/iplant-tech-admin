"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/hooks/useAuth"

export function AuthGuard({ children }) {
  const router = useRouter()
  const { isAuthenticated, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    if (isInitialized && !isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, isInitialized, router])

  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return children
}

export function GuestGuard({ children }) {
  const router = useRouter()
  const { isAuthenticated, isLoading, isInitialized } = useAuth()

  useEffect(() => {
    if (isInitialized && !isLoading && isAuthenticated) {
      router.push("/")
    }
  }, [isAuthenticated, isLoading, isInitialized, router])

  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    )
  }

  if (isAuthenticated) {
    return null
  }

  return children
}
