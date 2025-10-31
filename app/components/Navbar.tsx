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
			<ul
				tabIndex={0}
				className='menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow space-y-4 '
			>
				<li className='pb-3'>
					<a>{userName}</a>
				</li>
				<li>
					<a href='/issues' className='btn btn-accent'>
						Issues
					</a>
				</li>
				<li className='pb-3'>
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
		<nav className='flex items-center justify-between px-5 py-4 bg-zinc-900/95 backdrop-blur-md border-b border-zinc-800 sticky top-0 z-50 shadow-lg'>
			<div className='flex items-center gap-3'>
				<div className='w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-6 w-6 text-white'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'
						/>
					</svg>
				</div>
				<Link
					href={"/"}
					className='xl:text-3xl text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:scale-105 transition-transform'
				>
					Issue Tracker
				</Link>
			</div>
			<div>
				{session ? (
					<>
						<div className='lg:flex xl:space-x-4 items-center hidden gap-4'>
							<a
								href='/issues'
								className='px-4 py-2 rounded-lg hover:bg-zinc-800 transition-colors text-zinc-300 hover:text-white'
							>
								Issues
							</a>
							<div className='flex items-center gap-3 px-4 py-2 bg-zinc-800 rounded-lg'>
								<div className='w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm'>
									{session.user?.name?.charAt(0).toUpperCase()}
								</div>
								<p className='text-zinc-200'>{session.user?.name}</p>
							</div>
							<Button handleaction={handleLogOut} text='Sign Out' />
						</div>
						<Toggle userName={session.user?.name || ""} handler={handleLogOut} text='Sign Out' />
					</>
				) : (
					<>
						<div className='lg:block hidden'>
							<Button handleaction={handleLogIn} text='Sign In' />
						</div>
						<Toggle userName='' handler={handleLogIn} text='Sign In' />
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
