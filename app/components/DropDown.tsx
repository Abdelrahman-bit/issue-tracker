"use client";
import { updateIssueStatus } from '@/utils/db';
import {useState} from 'react'

const DropDown = ({issueId}: {issueId: string}) => {
    const [status, setStatus] = useState('');
    const [isClicked, setClicked] = useState(false);
	// the follwing code is response for openning the dropdown menu
	const handleState = async (e: React.MouseEvent)=>{
        const clicked = (e.target as HTMLElement).innerText;
        setStatus(clicked);
		try {
			await updateIssueStatus(issueId, clicked as "OPEN" | "CLOSED" | "IN_PROGRESS");
		} catch (error) {
			console.error("Error updating issue:", error);
			
		}
        // the follwing code is response for closeing the dropdown menu
        setClicked(!isClicked);
		// the follwing code is response for closeing the dropdown menu after 10ms
        setTimeout(()=>{
            setClicked(false)
        },5)
    }
  return (
		<div className='dropdown dropdown-start'>
			<div tabIndex={0} role='button' className='btn m-1'>
				{status.length > 3 ? status : "Status"} ⬇️
			</div>
			<ul
				tabIndex={0}
				className={`dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ${
					isClicked ? "hidden" : "block"
				}`}
			>
				<li>
					<p onClick={handleState}>OPEN</p>
				</li>
				<li>
					<p onClick={handleState}>CLOSED</p>
				</li>
				<li>
					<p onClick={handleState}>IN_PROGRESS</p>
				</li>
			</ul>
		</div>
  );
}

export default DropDown