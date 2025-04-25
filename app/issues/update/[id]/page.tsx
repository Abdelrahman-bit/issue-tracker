import DropDown from "@/app/components/DropDown";
import { getIssue, updateIssue } from "@/utils/db";
import React from "react";

const updatePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const issue = await getIssue(id);
	return (
		<form action={updateIssue}>
			<div className='w-full flex justify-center items-center mt-5'>
				<div className='w-1/2 shadow-gray-500/30 shadow-xl flex flex-col space-y-5 bg-zinc-800 rounded-2xl p-6 '>
					<h1 className='text-2xl'>New Issue</h1>
					<fieldset className='fieldset '>
						<legend className='fieldset-legend '>Issue Title</legend>
						<input type='hidden' name='id' value={issue?.id} />
						<input
							type='text'
							name='title'
							className='input w-full'
							placeholder='Type here'
							defaultValue={issue?.title}
						/>
					</fieldset>
					<fieldset className='fieldset'>
						<legend className='fieldset-legend'>Description</legend>
						<textarea
							className='textarea h-24 w-full'
							name='description'
							placeholder='description'
							defaultValue={issue?.description ?? ""}
						></textarea>
						<div className='label'>Optional</div>
					</fieldset>
					<DropDown issueId={id} />
					<button type='submit' className='btn btn-accent my-3'>
						Update
					</button>
				</div>
			</div>
		</form>
	);
};

export default updatePage;
