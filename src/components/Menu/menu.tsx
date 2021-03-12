import React, { useState, createContext } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './menuItem'
type MenuMode = 'horizontal' | 'vertical'
type SelectCallback = (selectedIndex: number) => void
export interface MenuProps {
	defaultIndex?: number
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: SelectCallback
}
interface IMenuContext {
	index?: number
	onSelect?: SelectCallback
	mode?: string
}
export const MenuContext = createContext<IMenuContext>({ index: 0 })
const Menu: React.FC<MenuProps> = (props) => {
	const { className, defaultIndex, mode, style, onSelect, children } = props
	const [currentActive, setActive] = useState(defaultIndex)
	const classes = classNames('menu', className, {
		'menu-vertical': mode === 'vertical',
		'menu-horizontal': mode !== 'vertical'
	})
	const handleClick = (index: number) => {
		setActive(index)
		if (onSelect) {
			onSelect(index)
		}
	}
	const passedContext: IMenuContext = {
		index: currentActive,
		onSelect: handleClick,
		mode
	}
	const renderChildrens = React.Children.map(children, (child, index) => {
		const childElement = child as React.FunctionComponentElement<MenuItemProps>
		const { displayName } = childElement.type
		if (displayName == 'menuItem' || displayName == 'subMenu') {
			// return child
			return React.cloneElement(childElement, { index })
		} else {
			console.error('warning:child must be menuItem')
		}
	})
	return (
		<ul className={classes} style={style} data-testid="test-menu">
			<MenuContext.Provider value={passedContext}>
				{renderChildrens}
			</MenuContext.Provider>
		</ul>
	)
}

export default Menu
