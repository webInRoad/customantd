import React, { useState } from 'react'
import classNames from 'classnames'
import Icon from '../Icon/icon'
import Transition from '../Transition/transition'
type AlertType = 'success' | 'default' | 'danger' | 'warning'
export interface AlertProps {
	className?: string
	type?: AlertType
	showClose?: boolean
	title?: string
	content?: React.ReactNode
}

export const Alert: React.FC<AlertProps> = (props) => {
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
			<Transition
				in={showAlert}
				timeout={300}
				animation="zoom-in-left"
				wrapper={true}
			>
				<div className={alertClass}>
					<div>
						<span>{title}</span>
						{showClose ? (
							<span className={'closeIcon'} onClick={close}>
								<Icon icon="times" />
							</span>
						) : null}
					</div>
					{content ? <div className={contentClass}>{content}</div> : null}
				</div>
			</Transition>
		</>
	)
}
Alert.defaultProps = {
	type: 'default',
	showClose: true
}
export default Alert
