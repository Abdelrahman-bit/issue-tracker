import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Modal from "../components/Modal";
import IssueTable from "../components/IssueTable";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";

const Issues = async () => {
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect(`/api/auth/signin?callbackUrl`);
	}
	const user = await prisma.user.findUnique({
		where: {
			email: session?.user?.email || "",
		},
	});
	if (!user) {
		throw new Error("User not found");
	}
	const issuesCount = await prisma.issue.count({
		where: {
			userId: user.id,
		},
	});
	// const issuesCount = await prisma.user.findUnique({
	// 	where:{
	// 		email: session?.user?.email || '',
	// 	},
	// 	include:{
	// 		_count:{
	// 			select:{
	// 				issues: true,
	// 			}
	// 		}
	// 	}
	// });
	return (
		<div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 p-6'>
			<div className='max-w-6xl mx-auto'>
				{/* Header Section */}
				<div className='flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8'>
					<div>
						<h1 className='text-3xl lg:text-4xl font-bold text-white mb-2'>My Issues</h1>
						<div className='flex items-center gap-2'>
							<div className='px-4 py-2 bg-zinc-800 rounded-lg border border-zinc-700'>
								<span className='text-zinc-400 text-sm'>Total Issues:</span>
								<span className='ml-2 text-xl font-bold text-blue-400'>{issuesCount || 0}</span>
							</div>
						</div>
					</div>
					<Modal />
				</div>

				{/* Issues Table */}
				<div>{session?.user && <IssueTable />}</div>
			</div>
		</div>
	);
};

export default Issues;
