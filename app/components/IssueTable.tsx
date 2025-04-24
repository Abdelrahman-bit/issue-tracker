// components/IssueTable.tsx
// "use client";
import Link from "next/link";
import Modal from "./Modal";

type Issue = {
	id: number;
	title: string;
	status: "open" | "in progress" | "closed";
};

const statusColors = {
	"open": "bg-green-100 text-green-800",
	"closed": "bg-gray-200 text-gray-700",
    "in progress": 'bg-warning text-gray-700'
};
const issues: Issue[] = [
	{ id: 1, title: "bug to fix", status: "open" },
	{ id: 2, title: "change the color of the table ", status: "in progress" },
	{ id: 3, title: "add a talble to isse table ", status: "closed" },
];


export default function IssueTable() {
	return (
		<>
			<div className='flex max-w-5xl justify-between m-auto pb-4'>
				<h1 className='text-2xl font-bold mb-4'>Project Name</h1>
                <Modal />
				{/* <Link href={'/issues/new'} className='btn btn-circle btn-accent text-xl'>+</Link> */}
			</div>
			<div className='overflow-x-auto rounded-xl shadow max-w-5xl m-auto'>
				<table className='min-w-full bg-white text-sm text-left'>
					<thead className='bg-zinc-900 text-gray-200 uppercase text-xs'>
						<tr className='text-xl'>
							<th className='px-6 py-3'>#</th>
							<th className='px-6 py-3'>Title</th>
							<th className='px-6 py-3'>Status</th>
						</tr>
					</thead>
					<tbody className='bg-black'>
						{issues.map((issue) => (
							<tr key={issue.id} className='border-t hover:bg-gray-500 transition-all'>
								<td className='px-6 py-4'>{issue.id}</td>
								<td className='px-6 py-4'>
									<Link href={`/issues/${issue.id}`} className='text-gray-300 hover:underline'>
										{issue.title}
									</Link>
								</td>
								<td className='px-6 py-4'>
									<span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[issue.status]}`}>
										{issue.status.charAt(0).toUpperCase() + issue.status.slice(1)}
									</span>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</>
	);
}
