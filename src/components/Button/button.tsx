import React from 'react'
import classNames from 'classnames'
export type ButtonSize = 'large' | 'small'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
	className?: string
	size?: ButtonSize
	btnType?: ButtonType
	disabled?: boolean
	children: React.ReactNode
	link?: string
}
type NativeButtonProps = BaseButtonProps &
	React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorProps = BaseButtonProps &
	React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>
const Button: React.FC<ButtonProps> = (props) => {
	const {
		className,
		size,
		btnType,
		disabled,
		children,
		link,
		...resProps
	} = props
	const btnClass = classNames('btn', className, {
		// btn: true,
		[`btn-${size}`]: size,
		[`btn-${btnType}`]: btnType,
		disabled: btnType === 'link' && disabled
	})
	if (btnType === 'link') {
		return (
			<a className={btnClass} href={link} {...resProps}>
				{children}
			</a>
		)
	} else {
		return (
			<button className={btnClass} disabled={disabled} {...resProps}>
				{children}
			</button>
		)
	}
}
Button.defaultProps = {
	disabled: false,
	btnType: 'default'
}
export default Button
