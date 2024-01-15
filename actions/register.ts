"use server"

import bcrypt from 'bcryptjs'
import * as z from 'zod'

import { RegisterSchema } from '@/schemas'

import { db } from '@/lib/db'
import { getUserByEmail } from '@/data/user'
import { generateVerificationToken } from '@/lib/tokens'
import { sendVerificationEmail } from '@/lib/mail'

export const register = async (value: z.infer<typeof RegisterSchema>) => {
  const validate = RegisterSchema.safeParse(value)
  if (!validate.success) {
    return { error: "Invalid fidelds"}
  }

  const { email, password, firstName, lastName } = validate.data

  const hashedPassword = await bcrypt.hash(password, 10)

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return { error: "Email already exists"}
  }

  await db.user.create({
    data: {
      email,
      password: hashedPassword,
      name: firstName + " " + lastName,
      firstName,
      lastName
    }
  })

  const verificationToken = await generateVerificationToken(email)
  await sendVerificationEmail(verificationToken.email, verificationToken.token)
  // send verification user email

  return { success: "Confirmation e-mail sent" }
}