import { GuestGuard } from "@/components/auth-guard"

export default function AuthLayout({ children }) {
  return (
    <GuestGuard>
      {children}
    </GuestGuard>
  )
}



