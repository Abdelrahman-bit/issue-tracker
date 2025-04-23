"use client";
import { useSession, signIn, signOut, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";


const Navbar = () => {
	const [providers, setProviders] = useState<Record<string, { id: string }> | null>(null);
	useEffect(()=>{
		getProviders().then((prov)=>{
			setProviders(prov)
		})
	},[])
    const { data: session } = useSession();
	const handleLogOut = ()=>{
		 signOut({callbackUrl: '/'})
	}
	const handleLogIn = ()=>{
		if(!providers){
			signIn()
		}
		if (providers) {
			const providerId = Object.values(providers)[0]?.id; // Assuming you want the first provider
			if (providerId) {
				signIn(providerId, { callbackUrl: '/issues' });
			}
		}
	}
  return (
		<nav className='flex items-center justify-between px-5 py-3 bg-zinc-700'>
			<div>
				<p className='text-3xl font-bold text-zinc-200'>Issue Tracker</p>
			</div>
			<div>
				{session ? (
					<div className="flex space-x-4 items-center">
						<p>{session.user?.name}</p>
						<button className='btn btn-dash btn-error !p-1' onClick={handleLogOut}>
							Sign Out
						</button>
					</div>
				) : (
					<>
						<button className='btn btn-dash btn-accent' onClick={handleLogIn}>
							Sign In
						</button>
					</>
				)}
			</div>
		</nav>
  );
}

export default Navbar

function useStateRecord<T, U>(arg0: null): [any, any] {
	throw new Error("Function not implemented.");
}
