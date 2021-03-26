import React, {
	ReactElement,
	KeyboardEvent,
	useState,
	useEffect,
	useRef
} from 'react'
import classNames from 'classnames'
import { Input, InputProps } from '../Input/input'
import useDebounce from '../../hooks/useDebounce'
import useClickOutside from '../../hooks/useClickOutside'
import Icon from '../Icon/icon'
interface DataSourceObject {
	name: string
}

export type DataSourceType<T = {}> = T & DataSourceObject
export interface AutoCompleteProps
	extends Omit<InputProps, 'onChange' | 'onSelect'> {
	onChange: (
		item: DataSourceType
	) => DataSourceType[] | Promise<DataSourceType[]>
	onSelect?: (item: DataSourceType) => void
	renderOption?: (item: DataSourceType) => ReactElement
}
export const AutoComplete: React.FC<AutoCompleteProps> = (props) => {
	const { onChange, onSelect, renderOption, value, ...restProps } = props
	const [inputValue, setInputValue] = useState(value)
	const [highlightNum, setHighLightNum] = useState<number>(-1)
	const [dropDownData, setDropDownData] = useState<DataSourceType[]>([])
	const [loading, setLoading] = useState<boolean>(false)
	const triggerSearch = useRef(false)
	const componentRef = useRef<HTMLDivElement>(null)
	useClickOutside(componentRef, () => {
		setDropDownData([])
	})
	const debounceValue = useDebounce(inputValue, 500) as string
	useEffect(() => {
		if (debounceValue && triggerSearch.current) {
			setDropDownData([])
			const result = onChange({ name: debounceValue })
			if (result instanceof Promise) {
				setLoading(true)
				result.then((data) => {
					setLoading(false)
					// console.info(data, 'data')
					setDropDownData(data)
				})
			} else {
				setDropDownData(result)
			}
		} else {
			setDropDownData([])
		}
	}, [debounceValue])
	const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim()
		setInputValue(value)
		triggerSearch.current = true
	}
	const renderTemplate = (item: DataSourceType) => {
		return renderOption ? renderOption(item) : item.name
	}
	const handleOnSelect = (item: DataSourceType) => {
		setInputValue(item.name)
		setDropDownData([])
		onSelect && onSelect(item)
		triggerSearch.current = false
	}
	const generateDropDown = () => {
		return (
			<ul>
				{dropDownData.map((item, index) => {
					const cnames = classNames('item', {
						'is-active': highlightNum == index
					})
					return (
						<li
							key={index}
							className={cnames}
							onClick={() => handleOnSelect(item)}
						>
							{renderTemplate(item)}
						</li>
					)
				})}
			</ul>
		)
	}
	const highlight = (index: number) => {
		if (index < 0) {
			return 0
		}
		if (index >= dropDownData.length) {
			return dropDownData.length - 1
		}
		setHighLightNum(index)
	}
	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		switch (e.keyCode) {
			case 13:
				if (dropDownData[highlightNum]) {
					handleOnSelect(dropDownData[highlightNum])
				}
				break
			case 38:
				highlight(highlightNum - 1)
				break
			case 40:
				highlight(highlightNum + 1)
				break
			case 27:
				setDropDownData([])
				break
			default:
				break
		}
	}
	return (
		<div ref={componentRef} className="autoComplete-wrapper">
			<Input
				value={inputValue}
				onChange={handleOnChange}
				{...restProps}
				onKeyDown={handleKeyDown}
			/>
			{loading && <Icon icon="spinner" spin />}
			{generateDropDown()}
		</div>
	)
}
