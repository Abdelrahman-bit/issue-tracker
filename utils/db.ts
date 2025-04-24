'use server'
import prisma from "@/lib/prisma";

export const createIssue = async (formData: FormData) => {
    try {
        const issueData = {
            title: formData.get("title") as string,
            description: formData.get("description") as string | null,
            user: {
                connect: { id: 1 },
            },
        };
        const newIssue = await prisma.issue.create({
            data: issueData,
        });
    } catch (error) {
        console.error("Error creating issue:", error);
    }
	
};
