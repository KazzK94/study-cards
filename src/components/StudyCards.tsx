
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getStudyDecks } from '../data/storage'
import { StudyDeck } from '../types'
import { ArrowLeftIcon, ArrowRightIcon, ListRestartIcon } from 'lucide-react'

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

	const restart = () => {
		window.location.reload()
	}

	return (
		<div className="text-center">
			<h2 className="text-3xl font-bold mb-5 mt-3">{deck.title}</h2>
			<div className="mb-6 flex gap-4 justify-center items-center">
				<button
					onClick={prevCard}
					disabled={currentCardIndex === 0}
					className="bg-gray-300 text-gray-800/80 disabled:bg-gray-200/80 disabled:text-gray-300 px-4 py-2 rounded cursor-pointer"
				>
					<ArrowLeftIcon size={24} />
				</button>
				<p>
					{currentCardIndex + 1} / {deck.cards.length}
				</p>
				<button
					onClick={nextCard}
					disabled={currentCardIndex === deck.cards.length - 1}
					className="bg-gray-300 text-gray-800/80 disabled:bg-gray-200/80 disabled:text-gray-300 px-4 py-2 rounded cursor-pointer"
				>
					<ArrowRightIcon size={24} />
				</button>
			</div>
			<div className="bg-white px-6 pt-6 pb-4 rounded shadow-md mb-4 w-[90%] max-w-3xl mx-auto">
				<div className="text-xl mb-4 space-y-4">
					<div className='text-blue-800 font-semibold flex flex-col gap-1'>
						{currentCard.front.split('\n').map((line, i) => (<div key={i}>{!line ? <br /> : <p>{line}</p>}</div>))}
					</div>
					{
						showAnswer && (
							<>
								<div className='text-green-700 border-t border-gray-200 pt-4 flex flex-col gap-4'>
									{currentCard.back.split('\n').map((line, i) => (<div key={i}>{!line ? <br /> : <p>{line}</p>}</div>))}
								</div>
								{
									(currentCardIndex !== deck.cards.length - 1)
										? (
											<button
												onClick={nextCard}
												className='flex justify-center items-center gap-2 mx-auto border rounded-lg px-3 py-2 mt-8 bg-blue-700/90 text-white cursor-pointer text-base'
											>
												See Next Card
												<ArrowRightIcon size={20} />
											</button>
										) : (
											<button
												onClick={restart}
												className='flex justify-center items-center gap-2 mx-auto border rounded-lg px-3 py-2 mt-8 bg-slate-800 text-white cursor-pointer text-base'
											>
												<ListRestartIcon size={20} />
												Start Again
											</button>
										)
								}
							</>
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
		</div>
	)
}
