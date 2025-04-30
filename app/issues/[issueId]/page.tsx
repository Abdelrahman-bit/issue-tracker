import { getIssue } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

const IssueDetails = async ({ params }: { params: Promise<{ issueId: string }> }) => {
	const { issueId } = await params;
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect(`/api/auth/signin?callbackUrl`);
	}
	const issue = await getIssue(issueId);
	if (!issue) {
		return <div className='text-center text-2xl'>Issue not found</div>;
	}
	return (
		<div className='flex justify-center items-center mt-5 lg:mx-3'>
			<div className='w-9/10 lg:w-1/2 flex flex-col space-y-15 bg-zinc-800 rounded-2xl lg:p-6 p-3 '>
				<h1 className='text-3xl'> {issue?.title} </h1>
				<h2 className='text-2xl'> {issue?.description} </h2>

				<div className='flex items-center gap-4'>
					Issue Status
					<span className='px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
						{issue?.status}
					</span>
				</div>
				<div className="flex items-center gap-6">
					<a href={`/issues/update/${issue?.id}`} className='btn btn-warning'>
						Update
					</a>
					<a href='/issues' className='btn btn-active'>
						Back
					</a>
				</div>
			</div>
		</div>
	);
};

export default IssueDetails;
