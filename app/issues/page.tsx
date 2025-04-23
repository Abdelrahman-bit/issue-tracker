"use client";
import { useSession } from "next-auth/react";
import IssueTable from "../components/IssueTable";


const Issues = () => {
	const { data: session } = useSession();
	return (
		<div className="px-10 py-7">
			{session?.user && <IssueTable />}
		</div>
	);
};

export default Issues;
