"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "./Button";

const Toggle = ({ userName, handler, text }: { userName: string; handler: () => void; text: string }) => {
	return (
		<div className='dropdown dropdown-end lg:hidden'>
			<div tabIndex={0} role='button' className='btn btn-ghost btn-circle avatar'>
				<div className='w-10 rounded-full'>
					<img
						alt='Tailwind CSS Navbar component'
						src='https://img.freepik.com/premium-vector/avatar-profile-picture-icon-blue-background-flat-design-style-resources-graphic-element-design_991720-653.jpg?w=826'
					/>
				</div>
			</div>
			<ul tabIndex={0} className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-4 '>
				<li className="pb-3">
					<a>{userName}</a>
				</li>
				<li>
					<a href="/issues" className="btn btn-accent">Issues</a>
				</li>
				<li className="pb-3">
					<Button handleaction={handler} text={text} />
				</li>
			</ul>
		</div>
	);
};

const Navbar = () => {
	const [providers, setProviders] = useState<Record<string, { id: string }> | null>(null);

	useEffect(() => {
		getProviders().then((prov) => {
			setProviders(prov);
		});
	}, []);
	const { data: session } = useSession();

	const handleLogOut = () => {
		signOut({ callbackUrl: "/" });
	};
	const handleLogIn = () => {
		if (!providers) {
			signIn();
		}
		if (providers) {
			const providerId = Object.values(providers)[0]?.id; // Assuming you want the first provider
			if (providerId) {
				signIn(providerId, { callbackUrl: "/issues" });
			}
		}
	};
	return (
		<nav className='flex items-center justify-between px-5 py-3 bg-zinc-700'>
			<div>
				<Link href={"/"} className=' xl:text-3xl font-bold text-zinc-200'>
					Issue Tracker
				</Link>
			</div>
			<div>
				{session ? (
					<>
						<div className='lg:flex xl:space-x-4 items-center hidden'>
							<p>{session.user?.name}</p>
							<Button handleaction={handleLogOut} text='Sign Out' />
						</div>
						<Toggle
							userName={session.user?.name || ""}
							handler={handleLogOut}
							text='Sign Out'
						/>
					</>
				) : (
					<>
					<div className='lg:block hidden'>
						<Button handleaction={handleLogIn} text='Sign In' />
					</div>
						<Toggle
							userName=''
							handler={handleLogIn}
							text='Sign In'
						/>
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
