import React from 'react'
import classNames from 'classnames'
import {
	FontAwesomeIcon,
	FontAwesomeIconProps
} from '@fortawesome/react-fontawesome'
export type ThemeProps =
	| 'primary'
	| 'secondary'
	| 'success'
	| 'info'
	| 'warning'
	| 'danger'
	| 'light'
	| 'dark'

export interface IIconProps extends FontAwesomeIconProps {
	theme?: ThemeProps
}
const Icon: React.FC<IIconProps> = (props) => {
	const { className, theme, ...retProps } = props
	const classes = classNames('icon', className, {
		[`icon-${theme}`]: theme
	})
	return <FontAwesomeIcon className={classes} {...retProps} />
}
export default Icon
