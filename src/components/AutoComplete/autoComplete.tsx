import React, { ReactElement, useState } from 'react'
import { Input, InputProps } from '../Input/input'
import Icon from '../Icon/icon'
interface DataSourceObject {
	name: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps
	extends Omit<InputProps, 'onChange' | 'onSelect'> {
	onChange?: (
		item: DataSourceType
	) => DataSourceType[] | Promise<DataSourceType[]>
	onSelect?: (item: DataSourceType) => void
	renderOption?: (item: DataSourceType) => ReactElement
}
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	const { onChange, onSelect, renderOption, value, ...restProps } = props
	const [inputValue, setInputValue] = useState(value)
	const [dropDownData, setDropDownData] = useState<DataSourceType[]>()
	const [loading, setLoading] = useState<boolean>(false)
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim()
		setInputValue(value)
		if (value) {
			const result = onChange && onChange({ name: value })
			if (result instanceof Promise) {
				setLoading(true)
				result.then((data) => {
					setLoading(false)
					console.info(data, 'data')
					setDropDownData(data)
				})
			} else {
				setDropDownData(result)
			}
		} else {
			setDropDownData([])
		}
	}
	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.name
	}
	const handleOnSelect = (item: DataSourceType) => {
		setInputValue(item.name)
		setDropDownData([])
		onSelect && onSelect(item)
	}
	const generateDropDown = () => {
		return (
			dropDownData && (
				<ul>
					{dropDownData.map((item, index) => {
						return (
							<li key={index} onClick={() => handleOnSelect(item)}>
								{renderTemplate(item)}
							</li>
						)
					})}
				</ul>
			)
		)
	}
	return (
		<div>
			<Input value={inputValue} onChange={handleOnChange} {...restProps} />
			{loading && <Icon icon="spinner" spin />}
			{generateDropDown()}
		</div>
	)
}
