"use client";
import { updateIssueStatus } from "@/utils/db";
import { useState } from "react";

const DropDown = ({ issueId }: { issueId: string }) => {
	const [status, setStatus] = useState("");
	const [isClicked, setClicked] = useState(false);
	const [isLoading, setIsLoading] = useState(false);

	const statusOptions = [
		{ value: "OPEN", label: "Open", color: "text-green-400", icon: "\ud83d\udd35" },
		{ value: "IN_PROGRESS", label: "In Progress", color: "text-yellow-400", icon: "\u23f3" },
		{ value: "CLOSED", label: "Closed", color: "text-gray-400", icon: "\u2713" },
	];

	const handleState = async (e: React.MouseEvent) => {
		const clicked = (e.target as HTMLElement).getAttribute("data-value");
		if (!clicked) return;

		setStatus(clicked);
		setIsLoading(true);
		try {
			await updateIssueStatus(issueId, clicked as "OPEN" | "CLOSED" | "IN_PROGRESS");
		} catch (error) {
			console.error("Error updating issue:", error);
		} finally {
			setIsLoading(false);
		}
		setClicked(!isClicked);
		setTimeout(() => {
			setClicked(false);
		}, 5);
	};
	return (
		<fieldset className='fieldset'>
			<legend className='fieldset-legend text-zinc-300 font-semibold flex items-center gap-2'>
				<svg xmlns='http://www.w3.org/2000/svg' className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path
						strokeLinecap='round'
						strokeLinejoin='round'
						strokeWidth={2}
						d='M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z'
					/>
				</svg>
				Status
			</legend>
			<div className='dropdown dropdown-start w-full'>
				<button
					type='button'
					tabIndex={0}
					className='btn w-full bg-zinc-900 border-zinc-700 hover:border-blue-500 text-white justify-between gap-2'
					disabled={isLoading}
				>
					<span className='flex items-center gap-2'>
						{isLoading ? (
							<span className='loading loading-spinner loading-sm'></span>
						) : (
							<>
								{status ? (
									<>
										<span>{statusOptions.find((opt) => opt.value === status)?.icon}</span>
										<span className={statusOptions.find((opt) => opt.value === status)?.color}>
											{statusOptions.find((opt) => opt.value === status)?.label}
										</span>
									</>
								) : (
									"Select Status"
								)}
							</>
						)}
					</span>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-4 w-4'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M19 9l-7 7-7-7' />
					</svg>
				</button>
				<ul
					tabIndex={0}
					className={`dropdown-content menu bg-zinc-900 border border-zinc-700 rounded-xl z-10 w-full p-2 shadow-xl mt-2 ${
						isClicked ? "hidden" : "block"
					}`}
				>
					{statusOptions.map((option) => (
						<li key={option.value}>
							<button
								type='button'
								onClick={handleState}
								data-value={option.value}
								className={`flex items-center gap-3 hover:bg-zinc-800 rounded-lg p-3 transition-colors ${
									status === option.value ? "bg-zinc-800" : ""
								}`}
							>
								<span>{option.icon}</span>
								<span className={option.color}>{option.label}</span>
							</button>
						</li>
					))}
				</ul>
			</div>
			{status && <div className='label text-zinc-400 text-sm'>Status will be updated immediately</div>}
		</fieldset>
	);
};

export default DropDown;
