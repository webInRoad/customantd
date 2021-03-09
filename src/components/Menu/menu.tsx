import React from 'react'
import classNames from 'classnames'
type MenuMode = 'horizontal' | 'vertical'
export interface MenuProps {
	defaultIndex?: number
	className?: string
	mode?: MenuMode
	style?: React.CSSProperties
	onSelect?: (selectedIndex: number) => {}
}
const Menu: React.FC<MenuProps> = (props) => {
	const { className, defaultIndex, mode, style, onSelect, children } = props
	const classes = classNames('menu', className, {
		'menu-vertical': mode === 'vertical'
	})
	return (
		<ul className={classes} style={style}>
			{children}
		</ul>
	)
}

export default Menu
