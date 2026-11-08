"use client"
import AuthForm, { AuthFormData } from "@/components/AuthForm"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"

const SignUpPage = () => {
  const router = useRouter()
  const handleSignUp = async (data: AuthFormData) => {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name as string,
      email: data.email,
      password: data.password,
      role: data.role ?? "seeker",
      callbackURL: "/",
    })
    console.log(signUpResponse, error)
    if (error) {
      console.error("Sign up error:", error)
      return
    }
    router.push("/")
    router.refresh()
  }
  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}

export default SignUpPage
