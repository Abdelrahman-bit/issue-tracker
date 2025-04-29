// app/auth/signin/page.tsx
"use client";

import { getProviders, signIn } from "next-auth/react";
import { useEffect, useState } from "react";

export default function SignIn() {
	const [providers, setProviders] = useState<any>(null);

	useEffect(() => {
		const fetchProviders = async () => {
			const res = await getProviders();
			setProviders(res);
		};
		fetchProviders();
	}, []);

	return (
		<div className='min-h-screen flex flex-col items-center justify-center bg-gray-600'>
			<h1 className="text-xl py-5 lg:text-3xl lg:py-8">Sign In Issue Tracker</h1>
			<div className='bg-zinc-800 p-8 rounded-2xl shadow-lg w-full max-w-sm text-center'>
				<h1 className='text-2xl font-bold mb-6'>Sign in to Your Account</h1>
				{providers &&
					Object.values(providers).map((provider: any) => (
						<button
							key={provider.name}
							onClick={() => signIn(provider.id)}
							className='w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl mb-4'
						>
							Sign in with {provider.name}
						</button>
					))}
			</div>
		</div>
	);
}
