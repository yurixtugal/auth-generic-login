"use server"

import * as z from 'zod'

import { RegisterSchema } from '@/schemas'

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(value)
  console.log(validate)
  if (!validate.success) {
    return { error: "Invalid fidelds"}
  }

  return { success: "Email sent"}
}