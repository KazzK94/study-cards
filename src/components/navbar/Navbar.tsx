
import { useState } from "react"
import { Link } from "react-router-dom"

export function Navbar() {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<nav className="bg-gray-800 text-white">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex items-center justify-between h-16">
					<div className="flex items-center">
						<Link to="/" className="text-xl font-bold">
							Study Decks
						</Link>
					</div>
					<div className="hidden md:block">
						<div className="ml-10 flex items-baseline space-x-4">
							<Link to="/create" className="hover:bg-gray-700 px-3 py-2 rounded-md">
								Create Deck
							</Link>
							<Link to="/view" className="hover:bg-gray-700 px-3 py-2 rounded-md">
								My Decks
							</Link>
						</div>
					</div>
					<div className="md:hidden">
						<button
							onClick={toggleMenu}
							className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
						>
							<span className="sr-only">Open main menu</span>
							{isOpen ? (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
								</svg>
							) : (
								<svg
									className="block h-6 w-6"
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									aria-hidden="true"
								>
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
								</svg>
							)}
						</button>
					</div>
				</div>
			</div>
			{isOpen && (
				<div className="md:hidden">
					<div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
						<Link to="/" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>
							Home
						</Link>
						<Link to="/create" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>
							Create Deck
						</Link>
						<Link to="/view" className="block hover:bg-gray-700 px-3 py-2 rounded-md" onClick={toggleMenu}>
							My Decks
						</Link>
					</div>
				</div>
			)}
		</nav>
	)
}
