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
	const statusColors = {
		OPEN: "bg-green-500/20 text-green-400 border border-green-500/30",
		CLOSED: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
		IN_PROGRESS: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
	};

	return (
		<div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex justify-center items-center p-6'>
			<div className='w-full max-w-3xl flex flex-col space-y-8 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-3xl p-8 lg:p-12 shadow-2xl'>
				{/* Header */}
				<div className='flex items-start gap-4'>
					<div className='w-14 h-14 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center flex-shrink-0'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-8 w-8 text-white'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z'
							/>
						</svg>
					</div>
					<div className='flex-1'>
						<h1 className='text-2xl lg:text-4xl font-bold text-white mb-2'>{issue?.title}</h1>
						<div className='flex items-center gap-3 mt-4'>
							<span className='text-sm text-zinc-400'>Status:</span>
							<span
								className={`px-4 py-2 rounded-full text-sm font-medium ${
									statusColors[issue?.status as keyof typeof statusColors] || statusColors.OPEN
								}`}
							>
								{issue?.status === "IN_PROGRESS"
									? "In Progress"
									: issue?.status.charAt(0).toUpperCase() + issue?.status.slice(1).toLowerCase()}
							</span>
						</div>
					</div>
				</div>

				{/* Description Section */}
				{issue?.description && (
					<div className='bg-zinc-900/50 rounded-2xl p-6 border border-zinc-700'>
						<h2 className='text-lg font-semibold text-zinc-300 mb-3 flex items-center gap-2'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M4 6h16M4 12h16M4 18h7' />
							</svg>
							Description
						</h2>
						<p className='text-zinc-400 leading-relaxed text-base lg:text-lg'>{issue?.description}</p>
					</div>
				)}

				{/* Action Buttons */}
				<div className='flex flex-col sm:flex-row gap-4 pt-4'>
					<a
						href={`/issues/update/${issue?.id}`}
						className='btn btn-warning flex-1 rounded-xl hover:scale-105 transition-transform border-0 shadow-lg gap-2'
					>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth={2}
								d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
							/>
						</svg>
						Edit Issue
					</a>
					<a href='/issues' className='btn btn-ghost flex-1 rounded-xl border border-zinc-700 hover:bg-zinc-700 gap-2'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							className='h-5 w-5'
							fill='none'
							viewBox='0 0 24 24'
							stroke='currentColor'
						>
							<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M10 19l-7-7m0 0l7-7m-7 7h18' />
						</svg>
						Back to Issues
					</a>
				</div>
			</div>
		</div>
	);
};

export default IssueDetails;
