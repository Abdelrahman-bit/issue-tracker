"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Button from "./Button";

const Navbar = () => {
	const pathName = usePathname();
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
				<Link href={"/"} className='text-3xl font-bold text-zinc-200'>
					Issue Tracker
				</Link>
			</div>
			<div>
				{session ? (
					<div className='flex space-x-4 items-center'>
						{pathName === "/issues" || (
							<Link href={"/issues"} className='btn btn-accent text-gray-600'>
								Issues
							</Link>
						)}
						<p>{session.user?.name}</p>
						<Button handleaction={handleLogOut} text='Sign Out' />
					</div>
				) : (
					<>
						<Button handleaction={handleLogIn} text='Sign In' />
					</>
				)}
			</div>
		</nav>
	);
};

export default Navbar;
