import Board from "./components/Board.jsx"

function App() {

	const wins = localStorage.getItem("wins")
	const loses = localStorage.getItem("loses")

	return (
		<div className="flex flex-col items-center my-3 gap-3">
			<h1 className="text-4xl">WORDLE</h1>
			<Board/>
			<div className="flex gap-3">
				<h1 className="text-3xl text-gray-500">wins:{wins}</h1>
				<h1 className="text-3xl text-gray-500">loses:{loses}</h1>
			</div>
		</div>
	)	
}

export default App;