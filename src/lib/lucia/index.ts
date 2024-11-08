import lucia from "lucia-auth";
import { prisma } from "$lib/server";
import { sveltekit } from "lucia/middleware";
import { PrismaAdapter } from "@lucia-auth/adapter-prisma";

export const auth = lucia({
	adapter: PrismaAdapter(prisma),
	env: import.meta.env.DEV ? "DEV" : "PROD",
	middleware: sveltekit(),
	transformDatabaseUser: (userData) => {
		return {
			userId: userData.id,
			email: userData.email
		};
	}
});

export type Auth = typeof auth;
