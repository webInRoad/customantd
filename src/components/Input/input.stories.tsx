import React from 'react'
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
