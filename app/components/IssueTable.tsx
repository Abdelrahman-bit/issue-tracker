import { deleteIssue, issuesData } from "@/utils/db";

const IssueTable = async () => {
	const issues = await issuesData();
	const statusColors = {
		OPEN: "bg-green-500/20 text-green-400 border border-green-500/30",
		CLOSED: "bg-gray-500/20 text-gray-400 border border-gray-500/30",
		IN_PROGRESS: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
	};
	return (
		<div className='overflow-x-auto rounded-2xl shadow-2xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm'>
			<table className='min-w-full min-h-full text-xs text-left'>
				<thead className='bg-zinc-800/80 text-zinc-300 uppercase text-xs border-b border-zinc-700'>
					<tr className='text-sm lg:text-base'>
						<th className='px-3 lg:px-6 py-4 lg:py-5 font-semibold'>#</th>
						<th className='px-3 lg:px-6 py-4 lg:py-5 font-semibold'>Title</th>
						<th className='px-3 lg:px-6 py-4 lg:py-5 font-semibold'>Status</th>
						<th className='px-3 lg:px-6 py-4 lg:py-5 font-semibold text-center'>Actions</th>
					</tr>
				</thead>
				<tbody className='bg-zinc-900/30'>
					{issues?.map((issue, index) => (
						<tr
							key={issue.id}
							className='border-t border-zinc-800 hover:bg-zinc-800/50 transition-all duration-200 group'
						>
							<td className='px-3 lg:px-6 py-4 lg:py-5 text-zinc-400 font-medium lg:text-lg'>{index + 1}</td>
							<td className='px-3 lg:px-6 py-4 lg:py-5'>
								<a
									href={`/issues/${issue.id}`}
									className='text-zinc-300 text-xs lg:text-base hover:text-blue-400 transition-colors flex items-center gap-2 group-hover:gap-3 duration-200'
								>
									<span className='line-clamp-1'>{issue.title}</span>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M9 5l7 7-7 7' />
									</svg>
								</a>
							</td>
							<td className='px-3 lg:px-6 py-4 lg:py-5'>
								<span
									className={`inline-flex px-3 py-1.5 rounded-full text-[.61rem] lg:font-medium lg:py-2 lg:text-xs lg:px-4 ${
										statusColors[issue.status]
									}`}
								>
									{issue.status === "IN_PROGRESS"
										? "In Progress"
										: issue.status.charAt(0).toUpperCase() + issue.status.slice(1).toLowerCase()}
								</span>
							</td>
							<td>
								<div className='flex items-center justify-center gap-2 lg:gap-3'>
									<a
										href={`/issues/update/${issue.id}`}
										className='btn btn-sm lg:btn-md btn-warning rounded-lg hover:scale-105 transition-transform border-0 shadow-lg'
										title='Edit Issue'
									>
										<svg
											xmlns='http://www.w3.org/2000/svg'
											className='h-4 w-4'
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
									</a>
									<form action={deleteIssue}>
										<input type='hidden' name='id' value={issue.id} />
										<button
											type='submit'
											className='btn btn-sm lg:btn-md btn-error rounded-lg hover:scale-105 transition-transform border-0 shadow-lg'
											title='Delete Issue'
										>
											<svg
												xmlns='http://www.w3.org/2000/svg'
												className='h-4 w-4'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													strokeLinecap='round'
													strokeLinejoin='round'
													strokeWidth={2}
													d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16'
												/>
											</svg>
										</button>
									</form>
								</div>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default IssueTable;
