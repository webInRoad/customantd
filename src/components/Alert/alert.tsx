import React from 'react'
import classNames from 'classnames'

export enum AlertType {
	Success = 'succss',
	Default = 'default',
	Danger = 'danger',
	Warning = 'warning'
}
interface AlertProps {
	className?: string
	type?: AlertType
	showClose?: boolean
	title?: string
	content?: React.ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
	const { className, type, showClose, title, content } = props
	const alertClass = classNames('alert', className, {
		[`alert-${type}`]: type
	})
	return (
		<div className={alertClass}>
			<div>{title}</div>
			{content ? <div>{content}</div> : null}
			{showClose ? <div className={'closeIcon'}>关闭</div> : null}
		</div>
	)
}
Alert.defaultProps = {
	type: AlertType.Default,
	showClose: true
}
export default Alert
