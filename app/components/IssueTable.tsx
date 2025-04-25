import { deleteIssue, issuesData } from "@/utils/db";

const IssueTable = async () => {
	const issues = await issuesData();
	const statusColors = {
		OPEN: "bg-green-100 text-green-800",
		CLOSED: "bg-gray-200 text-gray-700",
		IN_PROGRESS: "bg-warning text-gray-700",
	};
	return (
		<div className='overflow-x-auto rounded-xl shadow max-w-5xl m-auto'>
			<table className='min-w-full bg-white text-sm text-left'>
				<thead className='bg-zinc-900 text-gray-200 uppercase text-xs'>
					<tr className='text-xl'>
						<th className='px-6 py-3'>#</th>
						<th className='px-6 py-3'>Title</th>
						<th className='px-6 py-3'>Status</th>
						<th className='px-6 py-3'>Action</th>
					</tr>
				</thead>
				<tbody className='bg-black'>
					{issues?.map((issue) => (
						<tr key={issue.id} className='border-t hover:bg-gray-500 transition-all'>
							<td className='px-6 py-4'>{issue.id}</td>
							<td className='px-6 py-4'>
								<a href={`/issues/${issue.id}`} className='text-gray-300 text-lg hover:underline'>
									{issue.title}
								</a>
							</td>
							<td className='px-6 py-4 flex items-center justify-between'>
								<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
									{issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
								</span>
							</td>
							<td>
								<div className='flex space-x-4'>
									<a href={`/issues/update/${issue.id}`} className='btn btn-warning'>
										Update
									</a>
									<form action={deleteIssue}>
										<input type='hidden' name='id' value={issue.id} />
										<button type='submit' className='btn btn-error'>
											Delete
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
