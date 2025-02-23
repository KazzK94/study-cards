
import { Link } from 'react-router-dom'
import { deleteDeck } from '../../data/storage'
import type { StudyDeck as StudyDeckType } from '../../types'

export function StudyDeck({ deck }: { deck: StudyDeckType }) {

	const handleDeleteDeck = () => {
		if (!confirm('Are you sure you want to delete this deck?')) return
		deleteDeck(deck.id)
		window.location.reload()
	}

	return (
		<div className="p-4 rounded bg-white shadow">
			<h3 className="text-xl font-semibold">{deck.title}</h3>
			<p>{deck.cards.length} cards</p>
			<div className="mt-2 flex gap-2">
				<Link
					to={`/study/${deck.id}`}
					className="bg-green-600/90 hover:bg-green-600 text-white px-4 py-2 rounded"
				>
					Study
				</Link>
				<Link to={`/edit/${deck.id}`} className="bg-cyan-600/90 hover:bg-cyan-600 text-white px-4 py-2 rounded">
					Edit
				</Link>
				<button
					onClick={handleDeleteDeck}
					className="bg-red-500 hover:bg-red-600/90 text-white px-4 py-2 rounded cursor-pointer"
				>
					Delete
				</button>
			</div>
		</div>
	)
}