import React, { useState } from 'react'
import { Input, InputProps } from '../Input/input'

export interface AutoCompleteProps
	extends Omit<InputProps, 'onChange' | 'onSelect'> {
	onChange?: (item: string) => string[]
	onSelect?: (item: string) => void
}
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	const { onChange, onSelect, value, ...restProps } = props
	const [inputValue, setInputValue] = useState(value)
	const [dropDownData, setDropDownData] = useState<string[]>()
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim()
		setInputValue(value)
		if (value) {
			const data = onChange && onChange(value)
			setDropDownData(data)
		} else {
			setDropDownData([])
		}
	}
	const generateDropDown = () => {
		return (
			dropDownData && (
				<ul>
					{dropDownData.map((item, index) => {
						return <li key={index}>{item}</li>
					})}
				</ul>
			)
		)
	}
	return (
		<div>
			<Input value={inputValue} onChange={handleOnChange} />
			{generateDropDown()}
		</div>
	)
}
