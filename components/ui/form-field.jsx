"use client"

import { forwardRef } from "react"
import { cn } from "@/lib/utils"

const FormField = forwardRef(({ 
  label, 
  error, 
  className, 
  children, 
  required = false,
  ...props 
}, ref) => {
  return (
    <div className={cn("space-y-2", className)} {...props}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
})

FormField.displayName = "FormField"

export { FormField }


