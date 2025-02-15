
import { StudyDeck } from '../types'

const STUDY_DECKS_STORAGE_KEY = "studyDecks"

export function getStudyDecks() : StudyDeck[] {
	const storedDecks = JSON.parse(localStorage.getItem(STUDY_DECKS_STORAGE_KEY) || "[]")
	return storedDecks
}

export function createDeck(newDeck: StudyDeck) {
	const storedDecks = getStudyDecks()
	const updatedDecks = [...storedDecks, newDeck]
	localStorage.setItem(STUDY_DECKS_STORAGE_KEY, JSON.stringify(updatedDecks))
	return updatedDecks
}

export function updateDeck(updatedDeck: StudyDeck) {
	const storedDecks = getStudyDecks()
	const updatedDecks = storedDecks.map((deck: StudyDeck) => (deck.id === updatedDeck.id ? updatedDeck : deck))
	localStorage.setItem(STUDY_DECKS_STORAGE_KEY, JSON.stringify(updatedDecks))
	return updatedDecks
}

export function deleteDeck(deckId: string) {
	const storedDecks = getStudyDecks()
	const updatedDecks = storedDecks.filter((deck: StudyDeck) => deck.id !== deckId)
	localStorage.setItem(STUDY_DECKS_STORAGE_KEY, JSON.stringify(updatedDecks))
	return updatedDecks
}