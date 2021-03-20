import React from 'react'

import Button, { ButtonProps } from './button'

export default function TaskList(buttons: ButtonProps[]) {
	if (buttons.length === 0) {
		return <div className="list-items">empty</div>
	}

	return (
		<div className="list-items">
			{buttons.map((button) => (
				<Button key={button.id} {...button} />
			))}
		</div>
	)
}
