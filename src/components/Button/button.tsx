import React from 'react'
import classNames from 'classnames'

export enum ButtonSize {
	Large = 'large',
	Small = 'small'
}

export enum ButtonType {
	Primary = 'primary',
	Default = 'default',
	Danger = 'danger',
	Link = 'link'
}

interface ButtonProps {
	className?: string
	size?: ButtonSize
	btnType?: ButtonType
	disabled?: boolean
	children: React.ReactNode
	link?: string
}

const Button: React.FC<ButtonProps> = (props) => {
	const { className, size, btnType, disabled, children, link } = props
	const btnClass = classNames({
		btn: true,
		[`btn-${size}`]: size,
		[`btn-${btnType}`]: btnType,
		disabled: btnType === ButtonType.Link && disabled
	})
	if (btnType === ButtonType.Link) {
		return (
			<a className={btnClass} href={link}>
				{children}
			</a>
		)
	} else {
		return (
			<button className={btnClass} disabled={disabled}>
				{children}
			</button>
		)
	}
}
Button.defaultProps = {
	disabled: false,
	btnType: ButtonType.Default
}
export default Button
