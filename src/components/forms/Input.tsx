import { useId } from 'react'

interface InputProps {
	label?: string
	placeholder?: string
	type: string
	value: string
	onChange: (value: string) => void
	className?: string
}

export function Input({ label, type, value, placeholder, onChange, className }: InputProps) {

	const id = useId()

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange(e.target.value)
	}

	return (
		<>
			{label && <label className='block ml-0.5 mb-0.5 font-semibold' htmlFor={id}>{label}</label>}
			<input
				id={id}
				name={id}
				type={type}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				className={`block w-full p-2 rounded-md border border-gray-300 bg-white ${className||''}`}
			/>
		</>
	)
}
