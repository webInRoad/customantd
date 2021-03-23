import React, { useState } from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Input, InputProps } from './input'

export default {
	title: 'Input组件',
	component: Input
} as Meta

const Template: Story<InputProps> = (args) => (
	<Input style={{ width: '300px' }} {...args}></Input>
)
export const defaultInput = Template.bind({})
defaultInput.args = {
	placeholder: 'test'
}

export const sizeInput = Template.bind({})
sizeInput.args = {
	placeholder: 'test',
	size: 'lg'
}

export const disabledInput = Template.bind({})
disabledInput.args = {
	placeholder: 'disabled input',
	disabled: true
}

export const iconInput = Template.bind({})
iconInput.args = {
	placeholder: 'icon input',
	icon: 'search'
}
export const prependInput = Template.bind({})
prependInput.args = {
	placeholder: 'prepend input',
	defaultValue: 'prepend value',
	prepend: 'https://'
}
export const appendInput = Template.bind({})
appendInput.args = {
	placeholder: 'append input',
	defaultValue: 'google',
	append: '.com'
}
export const ControlInput = () => {
	const [value, setVal] = useState('')
	return (
		<Input
			value={value}
			defaultValue={value}
			onChange={(e) => setVal(e.target.value)}
		></Input>
	)
}
