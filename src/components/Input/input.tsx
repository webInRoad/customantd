import React, { InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
import Icon from '../Icon/icon'

type inputSize = 'lg' | 'sm'
export interface InputProps
	extends Omit<InputHTMLAttributes<HTMLElement>, 'size'> {
	/**设置input 大小，支持lg或者是sm */
	size?: inputSize
	/**是否禁用 Input */
	disabled?: boolean
	/**添加图标，在右侧悬浮添加一个图标，用于提示 */
	icon?: IconProp
	/**添加前缀 用于配置一些固定组合 */
	prepend?: string | React.ReactElement
	/**添加后缀 用于配置一些固定组合 */
	append?: string | React.ReactElement
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}
/** input输入框 */
export const Input: React.FC<InputProps> = (props) => {
	const { disabled, size, icon, prepend, append, style, ...restProps } = props
	const cnames = classNames('input-wrapper', {
		'is-disabled': disabled,
		[`input-size-${size}`]: size,
		'input-group': prepend || append,
		'input-group-prepend': prepend,
		'input-group-append': append
	})
	const fixControlledValue = (value: any) => {
		if (typeof value == 'undefined' || value === 'null') {
			return ''
		}
		return value
	}
	if ('value' in props) {
		delete props.defaultValue //value与defaultValue只能存在一个，不能既是受控，又是非受控组件
		restProps.value = fixControlledValue(props.value) //当value没有设置初始值时给予""
	}
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
