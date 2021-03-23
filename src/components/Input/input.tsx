import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type inputSize = 'lg' | 'sm'
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	size?: inputSize
	disbaled?: boolean
	icon?: IconProp
	prepend?: string | React.ReactNode
	append?: string | React.ReactNode
}
export const Input: React.FC<InputProps> = (props) => {
	const { disabled, size, icon, prepend, append, style, ...restProps } = props
	const cnames = classNames('input-wrapper', {
		'is-disabled': disabled,
		[`input-size-${size}`]: size,
		'input-group': prepend || append,
		'input-group-prepend': prepend,
		'input-group-append': append
	})
	return (
		<div className={cnames} style={style}>
			{prepend && <div className="input-group-prepend">{prepend}</div>}
			{icon && (
				<div className="icon-wrapper">
					<Icon icon={icon} title={`title-${icon}`} />
				</div>
			)}
			<input className="input-inner" disabled={disabled} {...restProps} />
			{append && <div className="input-group-append">{append}</div>}
		</div>
	)
}
