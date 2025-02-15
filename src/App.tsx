
import { BrowserRouter } from "react-router-dom"
import { RouterContent } from './components/Router'
import { Navbar } from './components/navbar/Navbar'

export default function App() {
	return (
		<BrowserRouter>
			<Navbar />
			<main className='px-3 py-2'>
				<RouterContent />
			</main>
		</BrowserRouter>
	)
}
