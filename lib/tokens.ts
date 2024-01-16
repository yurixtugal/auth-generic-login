import { db } from '@/lib/db';

import { getVerificationTokenByEmail } from '@/data/verification-token';
import { v4 as uuidv4 } from 'uuid';

import { getPasswordResetTokenByEmail } from '@/data/password-reset-token';


export const generateVerificationToken = async (email: string) => {
  const token = uuidv4();
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const verificationToken = await db.verificationToken.create({
    data: {
      token,
      expires: expirationDate,
      email
    }
  })

  return verificationToken;

}

export const generatePasswordResetToken = async (email: string) => {
  const token = uuidv4();
  const expirationDate = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getPasswordResetTokenByEmail(email);

  if (existingToken) {
    await db.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  const passwordResetToken = await db.passwordResetToken.create({
    data: {
      token,
      expires: expirationDate,
      email
    }
  })

  return passwordResetToken;
}