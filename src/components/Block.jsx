function Block({letter}){
	return (
		<div className={`flex justify-center items-center w-[56px] h-[56px] border border-gray-300 rounded-lg ${letter.correct && 'bg-green-500'}`}>
			<h1 className="text-3xl font-bold">{letter.char}</h1>
		</div>
	)
}

export default Block