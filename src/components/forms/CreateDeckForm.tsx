
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Card as CardType } from "../../types"
import { createDeck } from "../../data/storage"
import { Input } from "./Input"
import { PlusCircleIcon, SaveIcon, XIcon } from "lucide-react"
import { TextArea } from './TextArea'

export function CreateDeckForm() {
	const [title, setTitle] = useState("")
	const [cards, setCards] = useState<CardType[]>([{ front: "", back: "" }])
	const navigate = useNavigate()

	const addCard = () => {
		setCards([...cards, { front: "", back: "" }])
	}

	const updateCard = (index: number, field: "front" | "back", value: string) => {
		const updatedCards = [...cards]
		updatedCards[index][field] = value
		setCards(updatedCards)
	}

	const removeCard = (index: number) => {
		const updatedCards = cards.toSpliced(index, 1)
		setCards(updatedCards)
	}

	const saveDeck = () => {
		if (title.trim() === "" || cards.some((card) => card.front.trim() === "" || card.back.trim() === "")) {
			alert("Please fill in all fields")
			return
		}
		createDeck({
			id: Date.now().toString(),
			title,
			cards,
		})
		navigate("/view")
	}

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<h2 className="text-3xl font-bold mb-6 text-gray-800">Create New Study Deck</h2>
			<div className="mb-6">
				<Input
					label="Deck Name"
					type="text"
					placeholder="A title for your deck's content"
					value={title}
					onChange={(newValue) => setTitle(newValue)}
					className='border-gray-400'
				/>
			</div>

			<div className="space-y-6 mb-6">
				{cards.map((card, index) => (
					<div key={index} className="bg-white p-4 pt-3 rounded-lg shadow-md border border-gray-200">
						<div className="flex justify-between items-center mb-3">
							<h3 className="text-lg ml-1 font-semibold text-gray-700">Card {index + 1}</h3>
							<button
								onClick={() => removeCard(index)}
								className="text-red-500 hover:text-red-700 transition-colors mr-1"
								aria-label="Remove card"
							>
								<XIcon size={20} />
							</button>
						</div>
						<div className="space-y-3">
							<TextArea
								placeholder="Question"
								value={card.front}
								onChange={(newValue) => updateCard(index, "front", newValue)}
							/>
							<TextArea
								placeholder="Answer"
								value={card.back}
								onChange={(newValue) => updateCard(index, "back", newValue)}
							/>
						</div>
					</div>
				))}
			</div>

			<div className="flex justify-between items-center">
				<button
					onClick={addCard}
					className="flex items-center bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors"
				>
					<PlusCircleIcon size={20} className="mr-2" />
					Add Card
				</button>
				<button
					onClick={saveDeck}
					className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
				>
					<SaveIcon size={20} className="mr-2" />
					Save Deck
				</button>
			</div>
		</div>
	)
}

