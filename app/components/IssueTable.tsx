import { deleteIssue, issuesData } from "@/utils/db";

const IssueTable = async () => {
	const issues = await issuesData();
	const statusColors = {
		OPEN: "bg-green-100 text-green-800",
		CLOSED: "bg-gray-200 text-gray-700",
		IN_PROGRESS: "bg-warning text-gray-700",
	};
	return (
		<div className='overflow-x-auto rounded-xl shadow lg:max-w-5xl lg:m-auto'>
			<table className='min-w-full min-h-full bg-white text-xs text-left'>
				<thead className='bg-zinc-900 text-gray-200 uppercase text-xs'>
					<tr className=' text-sm lg:text-xl'>
						<th className='px-3 lg:px-6 py-1 lg:py-3'>#</th>
						<th className='px-3 lg:px-6 py-1 lg:py-3'>Title</th>
						<th className='px-3 lg:px-6 py-1 lg:py-3'>Status</th>
						<th className='px-3 lg:px-6 py-1 lg:py-3'>Action</th>
					</tr>
				</thead>
				<tbody className='bg-black'>
					{issues?.map((issue, index) => (
						<tr key={issue.id} className='border-t hover:bg-gray-500 transition-all'>
							<td className='px-3 lg:px-6 py-1 lg:py-3 lg:text-lg'>{index + 1}</td>
							<td className='px-3 lg:px-6 py-1 lg:py-3'>
								<a href={`/issues/${issue.id}`} className='text-gray-300 text-xs lg:text-lg hover:underline'>
									{issue.title}
								</a>
							</td>
							<td className='px-3 lg:px-6 py-1 lg:py-3 flex items-center justify-between'>
								<span
									className={`px-2 py-1 rounded-full text-[.61rem] lg:font-medium lg:py-2 lg:text-[.75rem] lg:px-4 ${
										statusColors[issue.status]
									}`}
								>
									{issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
								</span>
							</td>
							<td>
								<div className='flex space-x-5 align-center justify-center lg:space-x-4'>
									<a
										href={`/issues/update/${issue.id}`}
										className='btn btn-warning p-1 h-5 text-xs lg:p-5 lg:text-md'
									>
										<img src='/edit.png' alt='Edit' className='w-3 h-3' />
									</a>
									<form action={deleteIssue}>
										<input type='hidden' name='id' value={issue.id} />
										<button type='submit' className='btn btn-error p-1 text-xs h-5 lg:p-5 lg:text-md'>
											X
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
