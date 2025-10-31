const Button = ({ handleaction, text }: { handleaction: () => void; text: string }) => {
	const isSignOut = text.toLowerCase().includes("out");

	return (
		<button
			className={`btn rounded-lg ${
				isSignOut
					? "btn-error hover:scale-105 transition-transform shadow-lg"
					: "btn-accent hover:scale-105 transition-transform shadow-lg shadow-accent/30"
			} border-0`}
			onClick={handleaction}
		>
			{isSignOut ? (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1'
						/>
					</svg>
					{text}
				</>
			) : (
				<>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						className='h-5 w-5'
						fill='none'
						viewBox='0 0 24 24'
						stroke='currentColor'
					>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth={2}
							d='M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1'
						/>
					</svg>
					{text}
				</>
			)}
		</button>
	);
};

export default Button;
