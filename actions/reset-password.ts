"use server";

import * as z from "zod";

import { NewPasswordSchema, ResetPasswordSchema } from "@/schemas";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import { getUserByEmail } from "@/data/user";
import { generatePasswordResetToken } from "@/lib/tokens";
import { sendPasswordResetEmail } from "@/lib/mail";
import { getPasswordResetTokenByToken } from "@/data/password-reset-token";

export const ResetPassword = async (
  values: z.infer<typeof ResetPasswordSchema>
) => {
  const validate = ResetPasswordSchema.safeParse(values);

  if (!validate.success) {
    return { error: "Invalid fields" };
  }

  const { email } = validate.data;

  const existingUser = await getUserByEmail(email);

  if (!existingUser) {
    return { error: "User does not exist" };
  }

  const passwordResetToken = await generatePasswordResetToken(email);
  await sendPasswordResetEmail(
    passwordResetToken.email,
    passwordResetToken.token
  );

  return { success: "Reset Email sent" };
};

export const NewPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string | undefined
) => {
  if (!token) return { error: "Token is required" };

  const validate = NewPasswordSchema.safeParse(values);

  if (!validate.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validate.data;

  const passwordResetToken = await getPasswordResetTokenByToken(token);

  if (!passwordResetToken) return { error: "Token doesn't exists" };

  const hasExpired = new Date() > new Date(passwordResetToken.expires);

  if (hasExpired) return { error: "Token has expired" };

  const user = await getUserByEmail(passwordResetToken.email);

  if (!user) return { error: "User doesn't exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      password: hashedPassword,
    },
  });

  await db.passwordResetToken.delete({
    where: {
      id: passwordResetToken.id,
    },
  });

  return { success: "Password updated" };

};
