"use server"

import * as z from 'zod'

import { signIn } from '@/auth'
import { LoginSchema } from '@/schemas'
import { DEFAULT_LOGIN_REDIRECT } from '@/routes'
import { AuthError } from 'next-auth'

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validate = LoginSchema.safeParse(value)
  if (!validate.success) {
    return { error: "Invalid fidelds"}
  }

  const { email, password } = validate.data

  try{
    await signIn('credentials', {
      email,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT
    })

  } catch (error) {
    if (error instanceof AuthError){
      switch (error.type){
        case "CredentialsSignin": return { error: "Invalid credentials"};
        default: return { error: "Something went wrong"};
      }
    }
    throw error;
  }
}