"use client"
import AuthForm, { AuthFormData } from "@/components/AuthForm"
import { authClient } from "@/lib/auth-client"

const SignUpPage = () => {
  const handleSignUp = async (data: AuthFormData) => {
    const { data: signUpResponse, error } = await authClient.signUp.email({
      name: data.name as string,
      email: data.email,
      password: data.password,

      callbackURL: "/",
    })
    console.log(signUpResponse, error)
  }
  return <AuthForm mode="sign-up" onSubmit={handleSignUp} />
}

export default SignUpPage
