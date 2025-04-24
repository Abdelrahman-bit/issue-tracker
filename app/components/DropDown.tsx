"use client";
import {useState} from 'react'

const DropDown = () => {
    const [status, setStatus] = useState('');
    const [isClicked, setClicked] = useState(false);
	// the follwing code is response for openning the dropdown menu
	const handleState = (e: React.MouseEvent)=>{
        const clicked = (e.target as HTMLElement).innerText;
        setStatus(clicked);
        // the follwing code is response for closeing the dropdown menu
        setClicked(!isClicked);
		// the follwing code is response for closeing the dropdown menu after 10ms
        setTimeout(()=>{
            setClicked(false)
        },10)
    }
  return (
		<div className='dropdown dropdown-start'>
			<div tabIndex={0} role='button' className='btn m-1'>
				{status.length > 3? status : 'Status'} ⬇️
			</div>
			<ul tabIndex={0} className={`dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm ${isClicked? 'hidden' : 'block'}`}>
				<li>
					<p onClick={handleState}>Open</p>
				</li>
				<li>
					<p onClick={handleState}>Close</p>
				</li>
				<li>
					<p onClick={handleState}>In progress</p>
				</li>
			</ul>
		</div>
  );
}

export default DropDown