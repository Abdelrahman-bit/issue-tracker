// app/api/auth/[...nextauth]/route.ts
import prisma from "@/lib/prisma";
import NextAuth from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { signIn } from "next-auth/react";
import { pages } from "next/dist/build/templates/app-page";

export const authOptions = {
	providers: [
		GitHubProvider({
			clientId: process.env.GITHUB_ID!,
			clientSecret: process.env.GITHUB_SECRET!,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
	callbacks: {
		redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
			// // Allow relative URLs
			if (url.startsWith("/")) return `${baseUrl}${url}`;
			// // Allow URLs on the same origin
			// else if (new URL(url).origin === baseUrl) return url;
			return `${baseUrl}/issues`;
		},

		async signIn({ user } : any) {
			// Ensure email is defined
			if (!user.email) return false;

			// Check if the user exists in the database
			const existingUser = await prisma.user.findUnique({
				where: { email: user.email },
			});

			if (!existingUser) {
				// If the user does not exist, you can create a new user or deny access
				await prisma.user.create({
					data: {
						name: user.name || "Unknown", // Fallback for name if undefined
						email: user.email,
					},
				});
			}
			// Return true to allow sign-in
			return true;
		},
	},
	pages:{
		signIn: "/auth/signin",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
