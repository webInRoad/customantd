import React from 'react'
import { CSSTransition } from 'react-transition-group'
import { CSSTransitionProps } from 'react-transition-group/CSSTransition'

type AnimationName =
	| 'zoom-in-top'
	| 'zoom-in-bottom'
	| 'zoom-in-left'
	| 'zoom-in-right'
type TransitionProps = CSSTransitionProps & {
	animation?: AnimationName
}
// interface TransitionProps extends CSSTransitionProps {
// interface TransitionProps {
// 	animation?: AnimationName
// 	className?: string
// }

const Transition: React.FC<TransitionProps> = (props) => {
	const { children, className, animation, ...restProps } = props
	return (
		<CSSTransition
			classNames={className ? className : animation}
			{...restProps}
		>
			{children}
		</CSSTransition>
	)
}

Transition.defaultProps = {
	unmountOnExit: true,
	appear: true
}
export default Transition
