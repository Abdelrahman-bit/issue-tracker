"use client";

import Form from "next/form";
import { createIssue } from "@/utils/db";
import { useState } from "react";

const Modal = () => {
	const [loading, setLoading] = useState(false);
	const handleSubmit = async (formData: FormData, form: HTMLFormElement) => {
		setLoading(true);
		try {
			await createIssue(formData); // Call the server action to create the issue
			form.reset();
			const modalCheckbox = document.getElementById("my_modal_7") as HTMLInputElement;
			if (modalCheckbox) {
				modalCheckbox.checked = false; // Uncheck the modal checkbox to close the modal
			}
		} catch (error) {
			console.error("Error creating issue:", error);
		} finally {
			setLoading(false);
			// formData.set("title", ""); // Clear the title input
			// formData.set("description", ""); // Clear the description input
			// console.log(formData)
		}
	};

	return (
		<div>
			{/* The button to open modal */}
			<label
				htmlFor='my_modal_7'
				className='btn btn-accent btn-lg rounded-full shadow-xl shadow-accent/30 hover:scale-105 transition-transform border-0 gap-2'
			>
				<svg xmlns='http://www.w3.org/2000/svg' className='h-6 w-6' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
					<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
				</svg>
				New Issue
			</label>

			{/* Modal */}
			<input type='checkbox' id='my_modal_7' className='modal-toggle w-full' />
			<div className='modal w-full backdrop-blur-sm' role='dialog'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(new FormData(e.currentTarget), e.currentTarget);
					}}
					className='modal-box w-11/12 max-w-2xl shadow-2xl flex flex-col bg-zinc-800 rounded-2xl p-8 border border-zinc-700'
				>
					<div className='flex items-center gap-3 mb-6'>
						<div className='w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								className='h-6 w-6 text-white'
								fill='none'
								viewBox='0 0 24 24'
								stroke='currentColor'
							>
								<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 4v16m8-8H4' />
							</svg>
						</div>
						<h1 className='text-3xl font-bold text-white'>Create New Issue</h1>
					</div>

					<fieldset className='fieldset'>
						<legend className='fieldset-legend text-zinc-300 font-semibold'>Issue Title</legend>
						<input
							name='title'
							type='text'
							className='input w-full bg-zinc-900 border-zinc-700 focus:border-blue-500 text-white placeholder-zinc-500'
							placeholder='Enter issue title...'
							autoFocus
							required
						/>
					</fieldset>

					<fieldset className='fieldset'>
						<legend className='fieldset-legend text-zinc-300 font-semibold'>Description</legend>
						<textarea
							name='description'
							className='textarea h-32 w-full bg-zinc-900 border-zinc-700 focus:border-blue-500 text-white placeholder-zinc-500'
							placeholder='Describe the issue in detail...'
						></textarea>
						<div className='label text-zinc-400 text-sm'>Optional</div>
					</fieldset>

					<div className='flex gap-3 mt-4'>
						<button
							type='submit'
							className='btn btn-accent flex-1 rounded-xl hover:scale-105 transition-transform border-0 shadow-lg'
							disabled={loading}
						>
							{loading ? (
								<span className='loading loading-spinner'></span>
							) : (
								<>
									<svg
										xmlns='http://www.w3.org/2000/svg'
										className='h-5 w-5'
										fill='none'
										viewBox='0 0 24 24'
										stroke='currentColor'
									>
										<path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
									</svg>
									Create Issue
								</>
							)}
						</button>
						<label
							htmlFor='my_modal_7'
							className='btn btn-ghost flex-1 rounded-xl border border-zinc-700 hover:bg-zinc-700'
						>
							Cancel
						</label>
					</div>
				</form>
				<label className='modal-backdrop' htmlFor='my_modal_7'>
					Close
				</label>
			</div>
		</div>
	);
};

export default Modal;
