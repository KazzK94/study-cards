
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getStudyDecks } from '../data/storage'
import { StudyDeck } from '../types'

export function StudyCards() {
	const { blockId } = useParams<{ blockId: string }>()
	const navigate = useNavigate()
	const [deck, setDeck] = useState<StudyDeck | null>(null)
	const [currentCardIndex, setCurrentCardIndex] = useState(0)
	const [showAnswer, setShowAnswer] = useState(false)

	useEffect(() => {
		const storedDecks = getStudyDecks()
		const foundDeck = storedDecks.find((b: StudyDeck) => b.id === blockId)
		if (!foundDeck) {
			navigate("/view")
			return
		}
		// Shuffle cards and set deck
		setDeck({
			...foundDeck,
			cards: foundDeck.cards.toSorted(() => Math.random() - 0.5)
		})
	}, [blockId, navigate])

	if (!deck) {
		return <div>Loading...</div>
	}

	const currentCard = deck.cards[currentCardIndex]

	const nextCard = () => {
		if (currentCardIndex < deck.cards.length - 1) {
			setCurrentCardIndex(currentCardIndex + 1)
			setShowAnswer(false)
		}
	}

	const prevCard = () => {
		if (currentCardIndex > 0) {
			setCurrentCardIndex(currentCardIndex - 1)
			setShowAnswer(false)
		}
	}

	return (
		<div className="text-center">
			<h2 className="text-2xl font-bold mb-4">{deck.title}</h2>
			<div className="mb-4">
				<p>
					{currentCardIndex + 1} / {deck.cards.length}
				</p>
			</div>
			<div className="bg-white p-6 rounded shadow-md mb-4 w-[90%] max-w-3xl mx-auto">
				<div className="text-xl mb-4">
					{
						!showAnswer
							? (
								<div className='text-blue-800'>
									{currentCard.front.split('\n').map((line, i) => (<p key={i}>{line}</p>))}
								</div>
							) : (
								<div className='text-green-700'>
									{currentCard.back.split('\n').map((line, i) => (<p key={i}>{line}</p>))}
								</div>
							)
					}
				</div>

				{
					!showAnswer && (
						<button
							onClick={() => setShowAnswer(true)}
							className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
						>
							Show Answer
						</button>
					)
				}

			</div>
			<div className="space-x-4">
				<button
					onClick={prevCard}
					disabled={currentCardIndex === 0}
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
				>
					Previous
				</button>
				<button
					onClick={nextCard}
					disabled={currentCardIndex === deck.cards.length - 1}
					className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400 disabled:opacity-50"
				>
					Next
				</button>
			</div>
		</div>
	)
}
