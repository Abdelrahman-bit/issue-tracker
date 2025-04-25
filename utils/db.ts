"use server";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

declare module "next-auth" {
	interface Session {
		user: {
			id?: string;
			name?: string | null;
			email?: string | null;
		};
	}
}

export const createIssue = async (formData: FormData) => {
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email ? session.user.email : undefined;
	try {
		if (!userEmail) {
			throw new Error("User ID is missing or invalid.");
		}
		const issueData = {
			title: formData.get("title") as string,
			description: formData.get("description") as string | null,
			user: {
				connect: { email: userEmail },
			},
		};
		await prisma.issue.create({
			data: issueData,
		});
	} catch (error) {
		console.error("Error creating issue:", error);
	}
	revalidatePath("/issues");
};

export const deleteIssue = async (formData: FormData) => {
	const id = parseInt(formData.get("id") as string, 10);
	try {
		await prisma.issue.delete({
			where: { id },
		});
	} catch (error) {
		console.error("Error deleting issue:", error);
	}
	revalidatePath("/issues");
};

export const updateIssue = async (formData: FormData) => {
	const id = parseInt(formData.get("id") as string, 10);
	const title = formData.get("title") as string;
	const description = formData.get("description") as string | null;
	console.log(description + "\n" + title + "\n" + id);
	try {
		await prisma.issue.update({
			where: { id },
			data: { title, description },
		});
		console.log(`Issue updated successfully with ID: ${id}`);
	} catch (error) {
		console.error("Error updating issue:", error);
	}
	redirect("/issues");
};

export const updateIssueStatus = async (issueId: string, status: string) => {
	try {
		await prisma.issue.update({
			where: { id: parseInt(issueId) },
			data: { status: status as "OPEN" | "IN_PROGRESS" | "CLOSED" },
		});
	} catch (error) {
		console.error("Error updating issue status:", error);
	}
};

export const issuesData = async () => {
	const session = await getServerSession(authOptions);
	const userEmail = session?.user?.email ? session.user.email : undefined;
	const issues = await prisma.issue.findMany({ where: { user: { email: userEmail } } });
	return issues;
};

export const getIssue = async (id: string) => {
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	});
	return issue;
};
