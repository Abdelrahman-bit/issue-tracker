import Form from "next/form";
import { createIssue } from "@/utils/db";

const Modal = () => {
	
	return (
		<div className=''>
			{/* The button to open modal */}
			<label htmlFor='my_modal_7' className='btn btn-circle btn-accent text-xl'>
				+
			</label>

			{/* Put this part before </body> tag */}
			<input type='checkbox' id='my_modal_7' className='modal-toggle w-full' />
			<div className='modal m-' role='dialog'>
				<Form
					action={createIssue}
					className=' modal-box w-1/3 shadow-gray-500/30 shadow-xl flex flex-col bg-zinc-800 rounded-2xl p-6 '
				>
					<h1 className='text-2xl'>New Issue</h1>
					<fieldset className='fieldset '>
						<legend className='fieldset-legend '>Issue Title</legend>
						<input name='title' type='text' className='input w-full' placeholder='Type here' required />
						{/* <p className='label'>Optional</p> */}
					</fieldset>
					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Description</legend>
						<textarea name='description' className='textarea h-24 w-full' placeholder='Discription'></textarea>
						<div className='label'>Optional</div>
					</fieldset>
					<button type='submit' className='btn btn-accent my-3'>
						Add
					</button>
				</Form>
				<label className='modal-backdrop' htmlFor='my_modal_7'>
					Close
				</label>
			</div>
		</div>
	);
};

export default Modal;
