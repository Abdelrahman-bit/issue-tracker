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
			<label htmlFor='my_modal_7' className='btn btn-circle btn-accent text-xl'>
				+
			</label>

			{/* Modal */}
			<input type='checkbox' id='my_modal_7' className='modal-toggle w-full' />
			<div className='modal w-full' role='dialog'>
				<form
					onSubmit={(e) => {
						e.preventDefault();
						handleSubmit(new FormData(e.currentTarget), e.currentTarget);
					}}
					className='modal-box w-9/10 lg:w-1/3 shadow-gray-500/30 shadow-xl flex flex-col bg-zinc-800 rounded-2xl p-6'
				>
					<h1 className='text-2xl'>New Issue</h1>
					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Issue Title</legend>
						<input name='title' type='text' className='input w-full' placeholder='Type here' autoFocus required />
					</fieldset>
					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Description</legend>
						<textarea name='description' className='textarea h-24 w-full' placeholder='Description'></textarea>
						<div className='label'>Optional</div>
					</fieldset>
					<button type='submit' className='btn btn-accent my-3' disabled={loading}>
						Add
					</button>
				</form>
				<label className='modal-backdrop' htmlFor='my_modal_7'>
					Close
				</label>
			</div>
		</div>
	);
};

export default Modal;
