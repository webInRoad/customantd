import React, { useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
export interface MenuItemProps {
	index?: number
	disabled?: boolean
	className?: string
	style?: React.CSSProperties
}
const MenuItems: React.FC<MenuItemProps> = (props) => {
	const { index, disabled, className, style, children } = props
	const passedContext = useContext(MenuContext)
	const classes = classNames('menu-item', className, {
		'is-disabled': disabled,
		'is-actived': passedContext.index == index
	})
	const handleClick = () => {
		if (passedContext.onSelect && !disabled && typeof index == 'number') {
			passedContext.onSelect(index)
		}
	}
	return (
		<li key={index} className={classes} style={style} onClick={handleClick}>
			{children}
		</li>
	)
}
MenuItems.displayName = 'menuItem'
export default MenuItems
