
const newIssue = () => {
  return (
		<div className='w-full flex justify-center items-center mt-5'>
			<div className='w-1/3 shadow-gray-500/30 shadow-xl flex flex-col bg-zinc-800 rounded-2xl p-6 '>
				<h1 className='text-2xl'>New Issue</h1>
				<fieldset className='fieldset '>
					<legend className='fieldset-legend '>Issue Title</legend>
					<input type='text' className='input w-full' placeholder='Type here' />
					{/* <p className='label'>Optional</p> */}
				</fieldset>
				<fieldset className='fieldset'>
					<legend className='fieldset-legend'>Description</legend>
					<textarea className='textarea h-24 w-full' placeholder='Discription'></textarea>
					<div className='label'>Optional</div>
				</fieldset>
                <button className='btn btn-accent my-3'>Add</button>
                {/* <Modal /> */}
			</div>
		</div>
  );
}

export default newIssue