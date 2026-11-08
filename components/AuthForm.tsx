"use client"

import Link from "next/link"
import Image from "next/image"
import { FormEvent } from "react"
import { Eye, EyeOff, LockKeyhole, Mail } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FaGoogle } from "react-icons/fa"

export type AuthFormData = {
  email: string
  password: string
  name?: string
  confirmPassword?: string
  role?: "seeker" | "recruiter" | "admin"
}

type AuthFormProps = {
  mode: "sign-in" | "sign-up"
  onSubmit?: (data: AuthFormData) => void | Promise<void>
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const [showPassword, setShowPassword] = useState(false)
  const isSignUp = mode === "sign-up"

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const confirmPassword = event.currentTarget.elements.namedItem(
      "confirmPassword"
    ) as HTMLInputElement | null
    confirmPassword?.setCustomValidity("")

    const formData = new FormData(event.currentTarget)
    const data = Object.fromEntries(
      formData.entries()
    ) as unknown as AuthFormData

    if (isSignUp && data.password !== data.confirmPassword) {
      confirmPassword?.setCustomValidity("Passwords do not match")
      confirmPassword?.reportValidity()
      return
    }

    if (onSubmit) {
      onSubmit(data)
    } else {
      console.log(`${isSignUp ? "Sign up" : "Sign in"} submitted`, data)
    }
  }

  const handleGoogleSignIn = () => {
    console.log(`${isSignUp ? "Sign up" : "Sign in"} with Google clicked`)
  }

  return (
    <main className="relative min-h-[calc(100vh-96px)] overflow-hidden px-4 py-10 text-white md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src="/globe.png"
          alt=""
          fill
          priority
          className="object-cover object-bottom opacity-30"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#090909]/75 via-[#090909]/85 to-[#090909]" />
      </div>

      <div className="relative mx-auto w-full max-w-[460px] rounded-2xl border border-neutral-800/90 bg-[#0b0e13]/95 p-5 shadow-2xl shadow-black/40 backdrop-blur-xl sm:p-8">
        <div className="mb-7 text-center">
          <Link href="/" className="inline-flex" aria-label="Go to homepage">
            <Image
              src="/logo.png"
              alt="HireLoop"
              width={140}
              height={32}
              priority
              className="h-8 w-auto"
            />
          </Link>
          <h1 className="mt-6 text-2xl font-bold tracking-tight sm:text-3xl">
            {isSignUp ? "Create your account" : "Welcome back"}
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            {isSignUp
              ? "Start finding the opportunities made for you."
              : "Sign in to continue to your HireLoop account."}
          </p>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleSignIn}
          className="h-11 w-full rounded-xl border-neutral-700 bg-neutral-900/70 text-sm text-white hover:bg-neutral-800 hover:text-white"
        >
          <FaGoogle />
          Continue with Google
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="h-px flex-1 bg-neutral-800" />
          <span className="text-xs text-neutral-500">
            or continue with email
          </span>
          <div className="h-px flex-1 bg-neutral-800" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-medium text-neutral-300"
              >
                Full name
              </label>
              <Input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Enter your full name"
                className="h-11 rounded-xl border-neutral-800 bg-neutral-900/70 px-3 text-white placeholder:text-neutral-600 focus-visible:border-indigo-500"
              />
            </div>
          )}

          {isSignUp && (
            <fieldset className="space-y-2">
              <legend className="text-sm font-medium text-neutral-300">
                Account type
              </legend>
              <div className="grid grid-cols-3 gap-2">
                {(["seeker", "recruiter", "admin"] as const).map((role) => (
                  <label
                    key={role}
                    className="flex cursor-pointer items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900/70 px-2 py-3 text-sm capitalize text-neutral-300 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-600/15 has-[:checked]:text-white"
                  >
                    <input
                      type="radio"
                      name="role"
                      value={role}
                      required
                      defaultChecked={role === "seeker"}
                      className="sr-only"
                    />
                    {role}
                  </label>
                ))}
              </div>
            </fieldset>
          )}

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-neutral-300"
            >
              Email address
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@example.com"
                className="h-11 rounded-xl border-neutral-800 bg-neutral-900/70 pl-10 text-white placeholder:text-neutral-600 focus-visible:border-indigo-500"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="text-sm font-medium text-neutral-300"
              >
                Password
              </label>
              {!isSignUp && (
                <button
                  type="button"
                  className="text-xs font-medium text-indigo-400 hover:text-indigo-300"
                >
                  Forgot password?
                </button>
              )}
            </div>
            <div className="relative">
              <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                required
                minLength={8}
                autoComplete={isSignUp ? "new-password" : "current-password"}
                placeholder="Enter your password"
                className="h-11 rounded-xl border-neutral-800 bg-neutral-900/70 pr-11 pl-10 text-white placeholder:text-neutral-600 focus-visible:border-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowPassword((current) => !current)}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-neutral-500 hover:text-neutral-300"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
          </div>

          {isSignUp && (
            <div className="space-y-2">
              <label
                htmlFor="confirmPassword"
                className="text-sm font-medium text-neutral-300"
              >
                Confirm password
              </label>
              <div className="relative">
                <LockKeyhole className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-neutral-500" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  minLength={8}
                  autoComplete="new-password"
                  placeholder="Confirm your password"
                  onInput={(event) => event.currentTarget.setCustomValidity("")}
                  className="h-11 rounded-xl border-neutral-800 bg-neutral-900/70 pl-10 text-white placeholder:text-neutral-600 focus-visible:border-indigo-500"
                />
              </div>
            </div>
          )}

          <div className="flex items-center gap-2.5 pt-1">
            <input
              id="agreement"
              name="agreement"
              type="checkbox"
              value="agreed"
              required={isSignUp}
              className="size-4 shrink-0 rounded border-neutral-700 bg-neutral-900 accent-indigo-600"
            />
            <label
              htmlFor="agreement"
              className="text-xs leading-5 text-neutral-400"
            >
              {isSignUp ? (
                <>
                  I agree to the{" "}
                  <Link
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="#"
                    className="text-indigo-400 hover:text-indigo-300"
                  >
                    Privacy Policy
                  </Link>
                  .
                </>
              ) : (
                "Remember me on this device"
              )}
            </label>
          </div>

          <Button
            type="submit"
            className="h-11 w-full rounded-xl bg-indigo-600 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
          >
            {isSignUp ? "Create account" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-neutral-400">
          {isSignUp ? "Already have an account?" : "Don’t have an account?"}{" "}
          <Link
            href={isSignUp ? "/sign-in" : "/sign-up"}
            className="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            {isSignUp ? "Sign-in" : "Create account"}
          </Link>
        </p>
      </div>
    </main>
  )
}
