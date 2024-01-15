import NextAuth, {DefaultSession} from "next-auth"
import authConfig from "@/auth.config"

import { db } from "@/lib/db"
import { getUserById } from "./data/user"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"


export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
   async linkAccount({user}){
      await db.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })  
   }
  },
  callbacks: {
    async signIn({user, account}) {
      if (account?.provider !== "credentials") return true;

      const existingUser = await getUserById(user.id);

      if (!existingUser?.emailVerified)  return false;

      return true;
    },
    async session({session, token}) {
      if (token.sub && session.user){
        session.user.id = token.sub
      }

      if (token.role && session.user){
        session.user.role = token.role as UserRole
      }

      return session;
    },
    async jwt({token}) {
      console.log({token})
      
      const idUser = token?.sub;

      if (idUser) {
        const user = await getUserById(idUser);
        token.role = user?.role;
      }

      return token;
    }
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig
  // Configure one or more authentication providers
})