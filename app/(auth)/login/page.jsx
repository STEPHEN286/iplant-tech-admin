import { GalleryVerticalEnd } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-4">
        <div className="bg-muted relative hidden lg:block col-span-3">
        <img
          src="https://res.cloudinary.com/disgj6wx5/image/upload/v1755003012/fkel0e4reyvaccousl1c.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale" />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10 col-span-1">
        
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      
    </div>
  );
}
