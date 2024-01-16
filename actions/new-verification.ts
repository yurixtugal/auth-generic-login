"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { getVerificationTokenByToken } from "@/data/verification-token";

export const confirmVerification = async (token: string) => {
  if (!token) return { error: "Token is required" };

  const verificationToken = await getVerificationTokenByToken(token);

  if (!verificationToken) return { error: "Token doesn't exists" };

  const hasExpired = new Date() > new Date(verificationToken.expires);

  if (hasExpired) return { error: "Token has expired" };

  const user = await getUserByEmail(verificationToken.email);

  if (!user) return { error: "User doesn't exists" };

  await db.user.update({
    where: {
      id: user.id,
    },
    data: {
      emailVerified: new Date(),
      email: verificationToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: verificationToken.id,
    },
  });

  return { success: "Email verified" };
};
