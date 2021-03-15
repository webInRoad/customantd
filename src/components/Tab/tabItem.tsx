import React, { useContext } from 'react'
import classNames from 'classnames'
import { TabContext } from './tabs'
export interface ITabItemProps {
	index?: number
	label: string | React.ReactNode
	disabled?: boolean
	className?: string
}
const TabItem: React.FC<ITabItemProps> = (props) => {
	const { index, label, disabled, className, children } = props
	const passedContext = useContext(TabContext)
	const classes = classNames('tab-item', className, {
		'is-actived': passedContext.index == index,
		'is-disabled': disabled
	})
	const handleSelected = () => {
		if (passedContext.onSelect && !disabled && typeof index == 'number') {
			passedContext.onSelect(index)
		}
	}
	return (
		<li className={classes} onClick={handleSelected}>
			{label}
		</li>
	)
}
TabItem.displayName = 'TABITEM'
export default TabItem
