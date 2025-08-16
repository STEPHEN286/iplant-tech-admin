"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"

export function useFormWithValidation(schema, defaultValues = {}) {
  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur", // Validate on blur for better UX
  })

  return form
}

// Hook for handling form submission with loading state
export function useFormSubmission(onSubmit, onError) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (data) => {
    setIsSubmitting(true)
    setSubmitError(null)
    
    try {
      await onSubmit(data)
    } catch (error) {
      setSubmitError(error)
      if (onError) {
        onError(error)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return {
    handleSubmit,
    isSubmitting,
    submitError,
  }
}

// Hook for password visibility toggle
export function usePasswordVisibility() {
  const [showPassword, setShowPassword] = useState(false)
  
  const togglePasswordVisibility = () => setShowPassword(!showPassword)
  
  return {
    showPassword,
    togglePasswordVisibility,
  }
}

// Hook for form field error styling
export function useFieldError(fieldName, errors) {
  const hasError = errors[fieldName]
  const errorMessage = hasError?.message
  
  const fieldClassName = hasError 
    ? "border-red-500 focus:border-red-500 focus:ring-red-500" 
    : ""
  
  return {
    hasError,
    errorMessage,
    fieldClassName,
  }
}


