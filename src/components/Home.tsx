
import { BookOpen, PlusCircle, List } from 'lucide-react'
import { Link } from 'react-router-dom'

export function Home() {
	return (
		<div className="">
			<div className="container mx-auto px-4 py-16 max-w-4xl">
				<header className="text-center mb-12">
					<h1 className="text-4xl font-bold text-blue-800 mb-4">Welcome to Study Decks</h1>
					<p className="text-xl text-gray-600">Your personal learning companion for efficient studying</p>
				</header>

				<main>
					<div className="grid md:grid-cols-2 gap-16">
						<div className="space-y-5">
							<h2 className="text-2xl font-semibold text-gray-800">Get Started Now</h2>
							<div className="space-y-1">
								<Link to="/view" className='flex justify-center items-center bg-gray-800 text-white px-4 py-2 rounded hover:opacity-95'>
									<List className="mr-2 h-4 w-4" />
									Review Your Study Decks
								</Link>
								<span className='block text-center'>or</span>
								<Link to="/create" className='flex justify-center items-center bg-blue-600 text-white px-4 py-2 rounded hover:opacity-90'>
									<PlusCircle className="mr-2 h-4 w-4" />
									Create a New Study Deck
								</Link>
							</div>
							<p className="text-sm text-gray-500 text-center mt-4">
								Join thousands of students who have improved their study habits with Study Decks.
							</p>
						</div>
						<div className="space-y-5">
							<h2 className="text-2xl font-semibold text-gray-800">Boost Your Learning</h2>
							<ul className="space-y-2">
								{['Create Study Decks', 'Organize topics easily', 'Study anytime, anywhere'].map((feature, index) => (
									<li key={index} className="flex items-center text-gray-700">
										<BookOpen className="h-5 w-5 mr-2 text-blue-500" />
										{feature}
									</li>
								))}
							</ul>
						</div>
					</div>
				</main>

				<footer className="mt-16 text-center text-gray-500 text-sm">
					<p><strong>&copy; 2025 · Reibal Dev</strong>.&nbsp; Some rights reserved <em>(not really lol)</em>.</p>
				</footer>
			</div>
		</div>
	)
}
