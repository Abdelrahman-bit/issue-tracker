
const Button = ({ handleaction, text }:{ handleaction: () => void; text: string }) => {
  return (
		<button className='btn btn-dash btn-info !p-1' onClick={handleaction}>
			{text}
		</button>
  );
}

export default Button