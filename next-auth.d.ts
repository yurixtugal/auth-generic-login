import { UserRole } from "@prisma/client";
import NextAuth, { type DefaultSession } from "next-auth";

export type ExtendedUser = DefaultSession["user"] & {
  role: UserRole;
}

export module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}