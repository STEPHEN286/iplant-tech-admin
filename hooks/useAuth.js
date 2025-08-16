import { useState, useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { authAPI } from '@/lib/api'

// Query keys for caching 
export const authKeys = {
  all: ['auth'],
  user: () => [...authKeys.all, 'user'],
  isAuthenticated: () => [...authKeys.all, 'isAuthenticated'],
}

export function useAuth() {
  const router = useRouter()
  const queryClient = useQueryClient()
  const [isInitialized, setIsInitialized] = useState(false)

  // Check if user is authenticated
  const { data: isAuthenticated = false, isLoading: isAuthLoading } = useQuery({
    queryKey: authKeys.isAuthenticated(),
    queryFn: () => authAPI.isAuthenticated(),
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })

  // Get current user data
  const { 
    data: user = null, 
    isLoading: isUserLoading,
    error: userError 
  } = useQuery({
    queryKey: authKeys.user(),
    queryFn: () => authAPI.getCurrentUser(),
    enabled: isAuthenticated,
    staleTime: 1000 * 60 * 5, // 5 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes
  })

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: ({ email, password }) => authAPI.login(email, password),
    onSuccess: (data) => {
      // Invalidate and refetch auth queries
      queryClient.invalidateQueries({ queryKey: authKeys.all })
      
      // Set user data in cache
      queryClient.setQueryData(authKeys.user(), data.user)
      queryClient.setQueryData(authKeys.isAuthenticated(), true)
      
      toast.success('Login successful! Welcome back.')
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Login error:', error)
      
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.response?.data?.detail) {
        errorMessage = error.response.data.detail
      } else if (error.response?.data?.non_field_errors) {
        errorMessage = error.response.data.non_field_errors[0]
      } else if (error.message) {
        errorMessage = error.message
      }
      
      toast.error(errorMessage)
    },
  })

  // Logout mutation
  const logoutMutation = useMutation({
    mutationFn: () => {
      authAPI.logout()
      return Promise.resolve()
    },
    onSuccess: () => {
      // Clear all auth-related queries
      queryClient.removeQueries({ queryKey: authKeys.all })
      
      // Reset cache
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.setQueryData(authKeys.isAuthenticated(), false)
      
      toast.success('Logged out successfully.')
      router.push('/login')
    },
    onError: (error) => {
      console.error('Logout error:', error)
      toast.error('Logout failed. Please try again.')
    },
  })

  // Refresh token mutation
  const refreshTokenMutation = useMutation({
    mutationFn: () => {
      const refreshToken = authAPI.getRefreshToken()
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      return authAPI.refreshToken(refreshToken)
    },
    onSuccess: (data) => {
      // Update access token in cache
      queryClient.setQueryData(authKeys.isAuthenticated(), true)
      toast.success('Session refreshed successfully.')
    },
    onError: (error) => {
      console.error('Token refresh error:', error)
      
      // Clear auth data and redirect to login
      queryClient.removeQueries({ queryKey: authKeys.all })
      queryClient.setQueryData(authKeys.user(), null)
      queryClient.setQueryData(authKeys.isAuthenticated(), false)
      
      toast.error('Session expired. Please login again.')
        router.push('/login')
      // navigate('/login')
    },
  })

  // Initialize auth state
  useEffect(() => {
    if (!isInitialized && !isAuthLoading) {
      setIsInitialized(true)
    }
  }, [isInitialized, isAuthLoading])

  // Login function
  const login = async (email, password) => {
    return loginMutation.mutateAsync({ email, password })
  }

  // Logout function
  const logout = async () => {
    return logoutMutation.mutateAsync()
  }

  // Refresh token function
  const refreshToken = async () => {
    return refreshTokenMutation.mutateAsync()
  }

  // Check if user has specific role/permission
  const hasRole = (role) => {
    return user?.role === role
  }

  // Check if user has specific permission
  const hasPermission = (permission) => {
    return user?.permissions?.includes(permission) || false
  }

  return {
    // State
    user,
    isAuthenticated,
    isInitialized,
    
    // Loading states
    isLoading: isAuthLoading || isUserLoading,
    isLoginLoading: loginMutation.isPending,
    isLogoutLoading: logoutMutation.isPending,
    isRefreshing: refreshTokenMutation.isPending,
    
    // Errors
    loginError: loginMutation.error,
    logoutError: logoutMutation.error,
    refreshError: refreshTokenMutation.error,
    userError,
    
    // Actions
    login,
    logout,
    refreshToken,
    hasRole,
    hasPermission,
    
    // Mutations (for advanced usage)
    loginMutation,
    logoutMutation,
    refreshTokenMutation,
  }
}

// Hook for components that only need auth state
export function useAuthState() {
  const { user, isAuthenticated, isLoading, isInitialized } = useAuth()
  
  return {
    user,
    isAuthenticated,
    isLoading,
    isInitialized,
  }
}

// Hook for login functionality
export function useLogin() {
  const { login, isLoginLoading, loginError } = useAuth()
  
  return {
    login,
    isLoading: isLoginLoading,
    error: loginError,
  }
}

// Hook for logout functionality
export function useLogout() {
  const { logout, isLogoutLoading, logoutError } = useAuth()
  
  return {
    logout,
    isLoading: isLogoutLoading,
    error: logoutError,
  }
}
