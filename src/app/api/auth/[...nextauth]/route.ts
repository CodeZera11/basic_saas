import NextAuth, { NextAuthOptions } from "next-auth";
import DiscordProvider from "next-auth/providers/discord";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    DiscordProvider({
      clientId: String(process.env.DISCORD_ID),
      clientSecret: String(process.env.DISCORD_SECRET),
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
