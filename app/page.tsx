export default function Home() {
	return (
		<div className='flex flex-col min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900'>
			<div className='flex-1 flex items-center justify-center p-6'>
				<div className='max-w-4xl w-full'>
					{/* Hero Section */}
					<div className='text-center space-y-8 mb-12'>
						<div className='space-y-4'>
							<h1 className='text-5xl lg:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient'>
								Issue Tracker
							</h1>
							<p className='text-xl lg:text-2xl text-zinc-300 font-light'>
								Your one-stop solution for managing issues efficiently
							</p>
						</div>

						{/* Feature Cards */}
						<div className='grid md:grid-cols-3 gap-6 mt-12 text-left'>
							<div className='bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700 hover:border-blue-500 transition-all duration-300 hover:transform hover:scale-105'>
								<div className='text-4xl mb-4'>📋</div>
								<h3 className='text-lg font-semibold text-white mb-2'>Track Issues</h3>
								<p className='text-sm text-zinc-400'>Organize and monitor all your issues in one place</p>
							</div>

							<div className='bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700 hover:border-purple-500 transition-all duration-300 hover:transform hover:scale-105'>
								<div className='text-4xl mb-4'>⚡</div>
								<h3 className='text-lg font-semibold text-white mb-2'>Real-time Updates</h3>
								<p className='text-sm text-zinc-400'>Stay synced with instant status changes</p>
							</div>

							<div className='bg-zinc-800/50 backdrop-blur-sm rounded-2xl p-6 border border-zinc-700 hover:border-pink-500 transition-all duration-300 hover:transform hover:scale-105'>
								<div className='text-4xl mb-4'>🎯</div>
								<h3 className='text-lg font-semibold text-white mb-2'>Stay Organized</h3>
								<p className='text-sm text-zinc-400'>Prioritize and manage your workflow efficiently</p>
							</div>
						</div>
					</div>

					{/* CTA Section */}
					<div className='text-center space-y-6'>
						<p className='text-zinc-400'>Sign in to your account to access all features</p>
						<div className='flex gap-4 justify-center'>
							<a
								href='/issues'
								className='btn btn-accent btn-lg rounded-full px-8 hover:scale-105 transition-transform shadow-lg shadow-accent/50'
							>
								View Issues
								<svg
									xmlns='http://www.w3.org/2000/svg'
									className='h-6 w-6'
									fill='none'
									viewBox='0 0 24 24'
									stroke='currentColor'
								>
									<path
										strokeLinecap='round'
										strokeLinejoin='round'
										strokeWidth={2}
										d='M13 7l5 5m0 0l-5 5m5-5H6'
									/>
								</svg>
							</a>
						</div>
						<p className='text-sm text-zinc-500'>Happy tracking! 🚀</p>
					</div>
				</div>
			</div>
		</div>
	);
}
