
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

import type { Card, StudyDeck } from '../../types'
import { getStudyDecks, updateDeck } from '../../data/storage'
import { Input } from './Input'
import { SaveIcon, XIcon } from 'lucide-react'
import { TextArea } from './TextArea'

export function EditBlockForm() {
	const { blockId } = useParams<{ blockId: string }>()
	const navigate = useNavigate()
	const [title, setTitle] = useState("")
	const [cards, setCards] = useState<Card[]>([])

	useEffect(() => {
		const storedBlocks = getStudyDecks()
		const blockToEdit = storedBlocks.find((block: StudyDeck) => block.id === blockId)
		if (blockToEdit) {
			setTitle(blockToEdit.title)
			setCards(blockToEdit.cards)
		} else {
			navigate("/view")
		}
	}, [blockId, navigate])

	const addCard = () => {
		setCards([...cards, { front: "", back: "" }])
	}

	const updateCard = (index: number, field: "front" | "back", value: string) => {
		const updatedCards = [...cards]
		updatedCards[index][field] = value
		setCards(updatedCards)
	}

	const removeCard = (index: number) => {
		const updatedCards = cards.filter((_, i) => i !== index)
		setCards(updatedCards)
	}

	const saveDeck = () => {
		if (title.trim() === "" || cards.some((card) => card.front.trim() === "" || card.back.trim() === "")) {
			alert("Please fill in all fields")
			return
		}
		updateDeck({
			id: blockId!,
			title,
			cards,
		})
		navigate("/view")
	}

	return (
		<div className="max-w-3xl mx-auto px-4 py-8">
			<button onClick={saveDeck} className='float-right bg-blue-500 text-white p-2 rounded-lg cursor-pointer hover:opacity-90'>
				<SaveIcon className='size-7' />
			</button>
			<h2 className="text-3xl font-bold mb-6 text-gray-800">Edit Deck</h2>
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
			<div className="space-y-4 mb-6">
				{cards.map((card, index) => (
					<div key={index} className="bg-gray-50/80 p-4 pt-3 rounded-lg shadow-md border border-gray-200">
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
			<button onClick={addCard} className="bg-green-500 text-white px-4 py-2 rounded mr-2 hover:bg-green-600">
				Add Card
			</button>
			<button onClick={saveDeck} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
				Save Changes
			</button>
		</div>
	)
}
