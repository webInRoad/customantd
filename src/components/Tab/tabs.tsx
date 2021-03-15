import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { ITabItemProps } from './tabItem'
type handleOnSelect = (index: number) => void
type mode = 'vertical' | 'horizontal'
type type = 'line' | 'card'
export interface ITabsProps {
	defaultIndex?: number
	type?: type
	mode?: mode
	onSelect?: handleOnSelect
	className?: string
}
interface IContext {
	index?: number
	onSelect?: handleOnSelect
	type?: type
}
export const TabContext = createContext<IContext>({ index: 0 })
const Tabs: React.FC<ITabsProps> = (props) => {
	const { defaultIndex, onSelect, className, type, mode, children } = props
	const [currentActive, setActive] = useState(defaultIndex)
	const classes = classNames('tabs', className, {
		'tabs-horizontal': mode !== 'vertical',
		'tabs-vertical': mode == 'vertical',
		'tabs-card': type == 'card'
	})
	const handleSelected = (index: number) => {
		if (onSelect) {
			onSelect(index)
		}
		setActive(index)
	}
	const passedContext: IContext = {
		index: currentActive,
		onSelect: handleSelected
	}
	const generateChildren = React.Children.map(children, (child, index) => {
		const childElement = child as React.FunctionComponentElement<ITabItemProps>
		return React.cloneElement(childElement, {
			index
		})
	})
	return (
		<div>
			<ul className={classes} data-testid="test-tabs">
				<TabContext.Provider value={passedContext}>
					{generateChildren}
				</TabContext.Provider>
			</ul>
			<ul className="content">
				{React.Children.map(children, (ele: any, index) => {
					if (index == currentActive) {
						return <li>{ele.props.children}</li>
					} else {
						return null
					}
				})}
			</ul>
		</div>
	)
}

export default Tabs
