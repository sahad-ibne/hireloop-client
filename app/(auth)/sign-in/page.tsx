"use client"
import AuthForm, { AuthFormData } from "@/components/AuthForm"
import { authClient } from "@/lib/auth-client"

const SignInPage = () => {
  const handleSignIn = async (data: AuthFormData) => {
    const { data: SignInResponse, error } = await authClient.signIn.email({
      email: data.email,
      password: data.password,
      rememberMe: true,
      callbackURL: "/",
    })
    console.log(SignInResponse, error)
  }
  return <AuthForm mode="sign-in" onSubmit={handleSignIn} />
}

export default SignInPage
