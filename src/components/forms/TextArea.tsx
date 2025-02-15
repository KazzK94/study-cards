import { useId } from 'react'

interface TextAreaProps {
	label?: string
	placeholder?: string
	value: string
	onChange: (value: string) => void
	className?: string
}

export function TextArea({ label, value, placeholder, onChange, className }: TextAreaProps) {

	const id = useId()

	const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		onChange(e.target.value)
	}

	return (
		<>
			{label && <label className='block ml-0.5 mb-0.5 font-semibold' htmlFor={id}>{label}</label>}
			<textarea
				id={id}
				name={id}
				value={value}
				placeholder={placeholder}
				onChange={handleChange}
				className={`block w-full resize-none [field-sizing:content] p-2 rounded-md border border-gray-300 bg-white ${className||''}`}
			/>
		</>
	)
}
