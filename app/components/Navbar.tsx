"use client";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
    const { data: session } = useSession();

  return (
		<nav className='flex items-center justify-between px-5 py-3 bg-zinc-700'>
			<div>
				<p className='text-3xl font-bold text-zinc-200'>Issue Tracker</p>
			</div>
			<div>
				{session ? (
					<div className="flex space-x-4 items-center">
						<p>{session.user?.name}</p>
						<button className='btn btn-dash btn-error' onClick={() => signOut()}>
							Sign Out
						</button>
					</div>
				) : (
					<>
						<button className='btn btn-dash btn-accent' onClick={() => signIn()}>
							Sign In
						</button>
					</>
				)}
			</div>
		</nav>
  );
}

export default Navbar