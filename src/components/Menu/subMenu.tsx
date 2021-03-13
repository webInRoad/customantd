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
		const childrenComponent = React.Children.map(children, (child, i) => {
			const childElement = child as React.FunctionComponentElement<MenuItemProps>
			if (childElement.type.displayName == 'menuItem') {
				return React.cloneElement(childElement, { index: `${index}-${i}` })
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
	let timer: any
	const handleMouse = (e: React.MouseEvent, toggle: boolean) => {
		e.preventDefault()
		clearTimeout(timer)
		timer = setTimeout(() => {
			setOpen(toggle)
		}, 300)
	}
	const clickEvent = context.mode == 'vertical' ? { onClick: handleClick } : {}
	const hoverEvent =
		context.mode != 'vertical'
			? {
					onMouseOver: (e: React.MouseEvent) => {
						handleMouse(e, true)
					},
					onMouseLeave: (e: React.MouseEvent) => {
						handleMouse(e, false)
					}
			  }
			: {}
	return (
		<li key={index} className={classes} {...hoverEvent}>
			<div className="submenu-title" {...clickEvent}>
				{title}
			</div>
			{renderChildren()}
		</li>
	)
}
SubMenu.displayName = 'subMenu'
export default SubMenu
