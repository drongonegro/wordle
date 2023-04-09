import {useState,useEffect} from "react"
import Block from "./Block.jsx"
import words from "../wordle.json"

function Board() {

	useEffect(() => {
		!(localStorage.getItem("wins")) && localStorage.setItem("wins",0)
		!(localStorage.getItem("loses")) && localStorage.setItem("loses",0)
	},[])

	const [board,setBoard] = useState([
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
		[{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false},{char:"",correct:false}],
	])

	const nkeys = [8,32,18,17,9,16,13,46]

	const [currentRow,setCurrentRow] = useState(0)
	const [currentCol,setCurrentCol] = useState(0)

	const genRandomWord = () => words[Math.floor(Math.random() * words.length - 1)]

	const [randomWord,setRandomWord] = useState(genRandomWord())
	
	const type = (e) => {
		for(let i = 0; i < nkeys.length; i++){
			if (e.keyCode == nkeys[i] || e.key.toUpperCase() == e.key ) {
				if (e.keyCode == 8) {
					if (currentCol == 0) {
						return 
					}else {
						let br = [...board]
						br[currentRow][currentCol - 1].char = ""
						setBoard(br)
						setCurrentCol(currentCol - 1)
					}
				}else if(e.keyCode == 13) {

					if (currentCol == 5) {
						if (currentRow-1 > 3) {
							alert("you lost gameover")
							localStorage.setItem("loses", parseInt(localStorage.getItem("loses")) + 1)
							window.location.reload()
							return
						}else {
							let test = ""
							board[currentRow].forEach((letter,id) => {
								test += letter.char
								if (randomWord.includes(letter.char.toLowerCase())) {
									letter.correct = true
								}
							})
							if (randomWord == test.toLowerCase()) {
								alert("you won")
								localStorage.setItem("wins", parseInt(localStorage.getItem("wins")) + 1)
								window.location.reload()
							}

							setCurrentRow(currentRow + 1)
							setCurrentCol(0)
						}
					}else {
						alert("too short")
					}

				}
				return	
			}
		}

		if (currentCol-1 > 3) {
			return
		}else {
			let b = [...board]
			b[currentRow][currentCol].char = e.key.toUpperCase()
			setBoard(b)
			setCurrentCol(currentCol + 1)
		}

	}

	useEffect(() => {
		document.addEventListener("keydown",type)
		return () => {
			document.removeEventListener("keydown",type)
		}
	},[type])

	return (
		<div>
			<div className="flex flex-col gap-2">
				{
					board.map((row,rid) => {
						return (
							<div key={rid} className="flex gap-2">
								{
									row.map((col,cid) => {
										return (
											<Block letter={col} key={cid}/>
										)
									})
								}
							</div>
						)
					})
				}
			</div>
		</div>
	)
}

export default Board