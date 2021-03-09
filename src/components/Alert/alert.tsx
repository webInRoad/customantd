import React, { useState } from 'react'
import classNames from 'classnames'

export enum AlertType {
	Success = 'success',
	Default = 'default',
	Danger = 'danger',
	Warning = 'warning'
}
export interface AlertProps {
	className?: string
	type?: AlertType
	showClose?: boolean
	title?: string
	content?: React.ReactNode
}

const Alert: React.FC<AlertProps> = (props) => {
	const { className, type, showClose, title, content } = props
	const [showAlert, setShowAlert] = useState<boolean>(true)
	const alertClass = classNames('alert', className, {
		[`alert-${type}`]: type
	})
	const contentClass = classNames('alert-content', {
		'alert-content-padding': showClose
	})
	function close() {
		setShowAlert(false)
	}
	return (
		<>
			{showAlert ? (
				<div className={alertClass}>
					<div>
						<span>{title}</span>
						{showClose ? (
							<span className={'closeIcon'} onClick={close}>
								关闭
							</span>
						) : null}
					</div>
					{content ? <div className={contentClass}>{content}</div> : null}
				</div>
			) : null}
		</>
	)
}
Alert.defaultProps = {
	type: AlertType.Default,
	showClose: true
}
export default Alert
