import React from 'react'
import classNames from 'classnames'
export type ButtonSize = 'lg' | 'sm'
export type ButtonType = 'primary' | 'default' | 'danger' | 'link'
interface BaseButtonProps {
	className?: string
	/**
	 * How large should the button be?
	 */
	size?: ButtonSize
	/**
	 * 按钮主题样式
	 */
	btnType?: ButtonType
	/**
	 * 按钮是否可操作
	 */
	disabled?: boolean
	children: React.ReactNode
	/**
	 * 链接地址
	 */
	link?: string
}
type NativeButtonProps = BaseButtonProps &
	React.ButtonHTMLAttributes<HTMLElement>
type NativeAnchorProps = BaseButtonProps &
	React.AnchorHTMLAttributes<HTMLElement>
export type ButtonProps = Partial<NativeButtonProps & NativeAnchorProps>
/**
 * Button Component
 */
export const Button: React.FC<ButtonProps> = (props) => {
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
