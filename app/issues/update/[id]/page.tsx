import { getIssue, updateIssue } from "@/utils/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import DropDown from "@/app/components/DropDown";
import { redirect } from "next/navigation";

const updatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
	const { id } = await params;
	const issue = await getIssue(id);
	const session = await getServerSession(authOptions);
	if (!session) {
		redirect(`/api/auth/signin?callbackUrl`);
	}
	return (
		<div className='min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 flex justify-center items-center p-6'>
			<form action={updateIssue} className='w-full max-w-3xl'>
				<div className='flex flex-col space-y-6 bg-zinc-800/50 backdrop-blur-sm border border-zinc-700 rounded-3xl p-8 lg:p-12 shadow-2xl'>
					{/* Header */}
					<div className='flex items-center gap-4 mb-4'>
						<div className='w-14 h-14 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-2xl flex items-center justify-center'>
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
									d='M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z'
								/>
							</svg>
						</div>
						<h1 className='text-3xl lg:text-4xl font-bold text-white'>Update Issue</h1>
					</div>

					<input type='hidden' name='id' value={issue?.id} />

					{/* Issue Title */}
					<fieldset className='fieldset'>
						<legend className='fieldset-legend text-zinc-300 font-semibold flex items-center gap-2'>
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
									d='M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z'
								/>
							</svg>
							Issue Title
						</legend>
						<input
							type='text'
							name='title'
							className='input w-full bg-zinc-900 border-zinc-700 focus:border-yellow-500 text-white placeholder-zinc-500'
							placeholder='Enter issue title...'
							defaultValue={issue?.title}
							required
						/>
					</fieldset>

					{/* Description */}
					<fieldset className='fieldset'>
						<legend className='fieldset-legend text-zinc-300 font-semibold flex items-center gap-2'>
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
						</legend>
						<textarea
							className='textarea h-32 w-full bg-zinc-900 border-zinc-700 focus:border-yellow-500 text-white placeholder-zinc-500'
							name='description'
							placeholder='Describe the issue in detail...'
							defaultValue={issue?.description ?? ""}
						></textarea>
						<div className='label text-zinc-400 text-sm'>Optional</div>
					</fieldset>

					{/* Status Dropdown */}
					<DropDown issueId={id} />

					{/* Action Buttons */}
					<div className='flex flex-col sm:flex-row gap-4 pt-4'>
						<button
							type='submit'
							className='btn btn-warning flex-1 rounded-xl hover:scale-105 transition-transform border-0 shadow-lg gap-2'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
							</svg>
							Save Changes
						</button>
						<a
							href='/issues'
							className='btn btn-ghost flex-1 rounded-xl border border-zinc-700 hover:bg-zinc-700 gap-2'
						>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-5 w-5'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
							</svg>
							Cancel
						</a>
					</div>
				</div>
			</form>
		</div>
	);
};

export default updatePage;
