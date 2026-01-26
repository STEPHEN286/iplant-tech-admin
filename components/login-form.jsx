"use client";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "./ui/switch";
import { Separator } from "./ui/separator";
import Image from "next/image";
import {useForm}  from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "@/lib/schemas";
import { useLogin } from "@/hooks/use-auth";

export function LoginForm({
  className,
  ...props
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const { mutate, isPending, isError, error } = useLogin();

  console.log("MUTATION STATE:", { isPending, isError, error });

  const rememberMe = watch("rememberMe");

  const onSubmit = (data) => {
    console.log("FORM SUBMITTED:", data);
    mutate({email: data.email, password: data.password})
  }
  

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit(onSubmit)} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h2 className="text-5xl font-bold text-left">Hello iPlant  admin</h2>
        {/* <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p> */}
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input 
            className="bg-gray-100" 
            id="email" 
            type="email" 
            placeholder="m@example.com" 
            {...register("email")}
            aria-invalid={errors.email ? "true" : "false"}
          />
          {errors.email && (
            <p className="text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
          </div>
          <Input 
            id="password" 
            placeholder="Enter your password" 
            className="bg-gray-100" 
            type="password" 
            {...register("password")}
            aria-invalid={errors.password ? "true" : "false"}
          />
          {errors.password && (
            <p className="text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>
        <div className="flex justify-between">
          <div className="flex items-center">
            <Switch 
              id="rememberMe" 
              checked={rememberMe}
              onCheckedChange={(checked) => setValue("rememberMe", checked)}
            />
            <Label htmlFor="rememberMe">Remember me</Label>
          </div>
          <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
            Forgot password?
          </a>
        </div>
        <Button 
          type="submit" 
          className="w-full bg-green-600" 
          disabled={isPending}
        >
          {isPending ? "Logging in..." : "Login"}
        </Button>
        {/* <Separator />
        <Button variant="outline" className="w-full bg-gray-800 text-white">
          <Image src="/google-color-svgrepo-com.svg" alt="Google" width={20} height={20} />
          Login with Google
        </Button> */}
      </div>
      {/* <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4 text-green-700">
          Sign up
        </a>
      </div> */}
    </form>
  );
}
