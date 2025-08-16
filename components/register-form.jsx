"use client"

import { useState } from "react"
import { Eye, EyeOff } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FormField } from "@/components/ui/form-field"
import { registerSchema } from "@/lib/validations/auth"
import { cn } from "@/lib/utils"

export function RegisterForm({
  className,
  onSuccess,
  ...props
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeToTerms: false,
    },
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      // Here you would call your registration API
      console.log("Registration data:", data)
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (onSuccess) {
        onSuccess(data)
      }
    } catch (error) {
      console.error("Registration error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={className} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Join iPlant and start managing your smart garden
        </p>
      </div>
      
      <div className="grid gap-6">
        <FormField
          label="Full Name"
          error={errors.fullName?.message}
          required
        >
          <Input
            {...register("fullName")}
            type="text"
            placeholder="Enter your full name"
            disabled={isLoading}
            className={errors.fullName ? "border-red-500 focus:border-red-500" : ""}
          />
        </FormField>

        <FormField
          label="Email"
          error={errors.email?.message}
          required
        >
          <Input
            {...register("email")}
            type="email"
            placeholder="Enter your email"
            disabled={isLoading}
            className={errors.email ? "border-red-500 focus:border-red-500" : ""}
          />
        </FormField>
        
        <FormField
          label="Password"
          error={errors.password?.message}
          required
        >
          <div className="relative">
            <Input
              {...register("password")}
              type={showPassword ? "text" : "password"}
              placeholder="Create a password"
              disabled={isLoading}
              className={cn(
                "pr-10",
                errors.password ? "border-red-500 focus:border-red-500" : ""
              )}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>

        <FormField
          label="Confirm Password"
          error={errors.confirmPassword?.message}
          required
        >
          <div className="relative">
            <Input
              {...register("confirmPassword")}
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm your password"
              disabled={isLoading}
              className={cn(
                "pr-10",
                errors.confirmPassword ? "border-red-500 focus:border-red-500" : ""
              )}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              disabled={isLoading}
            >
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </FormField>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <input
              {...register("agreeToTerms")}
              type="checkbox"
              id="agreeToTerms"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-1"
              disabled={isLoading}
            />
            <label htmlFor="agreeToTerms" className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-blue-600 hover:text-blue-800 font-medium">
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.agreeToTerms && (
            <p className="text-sm text-red-600">{errors.agreeToTerms.message}</p>
          )}
        </div>

        <Button 
          type="submit" 
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3 text-base font-medium"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create Account"}
        </Button>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <Button variant="outline" className="w-full py-3" disabled={isLoading}>
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Sign up with Google
        </Button>
      </div>
      
      <div className="text-center text-sm text-gray-600">
        Already have an account?{" "}
        <a href="/login" className="text-blue-600 hover:text-blue-800 font-medium">
          Sign in here
        </a>
      </div>
    </form>
  )
}


