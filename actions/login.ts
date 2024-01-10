"use server"

import * as z from 'zod'

import { LoginSchema } from '@/schemas'

export const login = async (value: z.infer<typeof LoginSchema>) => {
  const validate = LoginSchema.safeParse(value)
  console.log(validate)
  if (!validate.success) {
    return { error: "Invalid fidelds"}
  }

  return { success: "Email sent"}
}