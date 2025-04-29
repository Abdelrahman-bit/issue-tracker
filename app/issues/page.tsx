import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Modal from "../components/Modal";
import IssueTable from "../components/IssueTable";
import { redirect } from "next/navigation";


const Issues = async () => {
	const  session  = await getServerSession(authOptions);
	if(!session) {
		redirect(`/api/auth/signin?callbackUrl`);
	}
	return (
		<>
			<div className='flex max-w-5xl justify-between m-auto p-4'>
				<h1 className='text-2xl font-bold mb-4'>Project Name</h1>
				<Modal />
				{/* <Link href={'/issues/new'} className='btn btn-circle btn-accent text-xl'>+</Link> */}
			</div>
			<div className='p-2 lg:px-10 lg:py-7'>{session?.user && <IssueTable />}</div>
		</>
		// return <div className='px-10 py-7'><IssueTable /></div>;
	);
};

export default Issues;
