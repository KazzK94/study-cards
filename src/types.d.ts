
interface Card {
	front: string
	back: string
}

interface StudyDeck {
	id: string
	title: string
	cards: Card[]
}

export type { Card, StudyDeck }  