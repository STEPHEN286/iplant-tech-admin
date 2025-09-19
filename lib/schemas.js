import { z } from "zod"

// Smart Pod Schema
export const smartPodSchema = z.object({
  pod_model: z.string().min(1, "Pod model is required"),
  serial_number: z.string().min(1, "Serial number is required"),
  warranty_expiry: z.string().min(1, "Warranty expiry date is required"),
  manufacturing_batch: z.string().min(1, "Manufacturing batch is required"),
})

// Login Schema
export const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  rememberMe: z.boolean().default(false),
})

// Contact Message Schema
export const contactMessageSchema = z.object({
  full_name: z.string().min(1, "Full name is required"),
  email: z.string().email("Please enter a valid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
})

// Waitlist Schema
export const waitlistSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
})

// Product Schema
export const productSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  description: z.string().min(1, "Description is required"),
  stock: z.number().min(0, "Stock must be 0 or greater"),
  price: z.string().min(1, "Price is required"),
  category: z.string().min(1, "Category is required"),
  pod_model: z.string().min(1, "Pod model is required"),
})
