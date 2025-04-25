import { getIssue } from "@/utils/db";

const IssueDetails = async ({ params }: { params: Promise<{ issueId: string }> }) => {
	const { issueId } = await params;
	const issue = await getIssue(issueId);
	return (
		<div className='w-full flex justify-center items-center mt-5'>
			<div className='w-1/2 flex flex-col space-y-15 bg-zinc-800 rounded-2xl p-6 '>
				<h1 className='text-3xl'> {issue?.title} </h1>
				<h2 className='text-2xl'> {issue?.description} </h2>

				<div className='flex items-center gap-4'>
					Issue Status
					<span className='px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800'>
						{issue?.status}
					</span>
				</div>
				<a href={`/issues/update/${issue?.id}`} className='btn btn-warning'>
					Update
				</a>
			</div>
		</div>
	);
};

export default IssueDetails;
