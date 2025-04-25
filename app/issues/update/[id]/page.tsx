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
		<form action={updateIssue}>
			<div className='w-full flex justify-center items-center mt-5'>
				<div className='w-1/2 shadow-gray-500/30 shadow-xl flex flex-col space-y-5 bg-zinc-800 rounded-2xl p-6 '>
					<h1 className='text-2xl'>Update Issue</h1>
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
