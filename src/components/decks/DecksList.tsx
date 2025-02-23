
import { useState, useEffect } from "react"
import { getStudyDecks } from '../../data/storage'
import { StudyDeck as StudyDeckType } from '../../types'
import { StudyDeck } from '../decks/StudyDeck'
import { Link } from 'react-router-dom'
import { PlusIcon } from 'lucide-react'

export function ViewDecks() {
	const [decks, setDecks] = useState<StudyDeckType[]>([])

	useEffect(() => {
		const storedDecks = getStudyDecks()
		setDecks(storedDecks)
	}, [])

	return (
		<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
			<h2 className="text-2xl font-bold mb-4">Your Decks</h2>
			{decks.length === 0 ? (
				<p>No study decks created yet.</p>
			) : (
				<ul className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
					{decks.map((deck) => (
						<li key={deck.id}>
							<StudyDeck deck={deck} />
						</li>
					))}
				</ul>
			)}
			<Link to='/create' className="flex justify-center items-center gap-2 w-fit bg-blue-500/90 hover:bg-blue-500 text-white px-4 py-2 rounded mt-5 ml-2 cursor-pointer">
				<PlusIcon size={16} />
				<span>Create A New Study Deck</span>
			</Link>
		</div>
	)
}
