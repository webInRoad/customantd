import React, { useState, useContext } from 'react'
import classNames from 'classnames'
import { MenuContext } from './menu'
import { MenuItemProps } from './menuItem'
interface SubMenuProps {
	index?: string
	title: string
	className?: string
}
const SubMenu: React.FC<SubMenuProps> = ({
	index,
	title,
	className,
	children
}) => {
	const [isOpen, setOpen] = useState(false)
	const context = useContext(MenuContext)
	const classes = classNames('menu-item submenu-item', className, {
		'is-actived': context.index == index
	})

	const renderChildren = () => {
		const subClasses = classNames('submenu', {
			'is-opened': isOpen
		})
		const childrenComponent = React.Children.map(children, (child, index) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			if (childElement.type.displayName == 'menuItem') {
				return React.cloneElement(childElement, { index })
			} else {
				console.error('child must menuItem')
			}
		})
		return <ul className={subClasses}>{childrenComponent}</ul>
	}
	const handleClick = (e: React.MouseEvent) => {
		e.preventDefault()
		setOpen(!isOpen)
	}
	return (
		<li key={index} className={classes}>
			<div className="submenu-title" onClick={handleClick}>
				{title}
			</div>
			{renderChildren()}
		</li>
	)
}
SubMenu.displayName = 'subMenu'
export default SubMenu
