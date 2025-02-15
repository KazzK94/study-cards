
import { Route, Routes } from "react-router-dom"

import { Home } from "./Home"
import { CreateDeckForm } from "./forms/CreateDeckForm"
import { EditBlockForm } from './forms/EditDeckForm'
import { ViewDecks } from "./decks/DecksList"
import { StudyCards } from "./StudyCards"

export function RouterContent() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/create" element={<CreateDeckForm />} />
			<Route path="/edit/:blockId" element={<EditBlockForm />} />
			<Route path="/view" element={<ViewDecks />} />
			<Route path="/study/:blockId" element={<StudyCards />} />
		</Routes>
	)
}