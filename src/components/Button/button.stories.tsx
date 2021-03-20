import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import Button, { ButtonProps, ButtonSize, ButtonType } from './button'

export default {
	title: 'Button组件',
	component: Button,
	argTypes: {
		backgroundColor: { control: 'color' }
	}
	// decorators: [
	// 	(Story) => (
	// 		<div style={{ margin: '3em' }}>
	// 			<Story />
	// 		</div>
	// 	)
	// ]
} as Meta

const Template: Story<ButtonProps> = (args) => <Button {...args}>确认</Button>

// export const DefaultButton = Template.bind({})
// DefaultButton.args = {}

export const PrimaryButton = Template.bind({})
PrimaryButton.args = {
	btnType: 'primary'
}
export const DangerButton = Template.bind({})
DangerButton.args = {
	btnType: 'danger'
}
export const LinkButton = Template.bind({})
LinkButton.args = {
	btnType: 'link'
}
export const OneItem = () => (
	<>
		<Button btnType="primary">确认</Button>
		<Button btnType="danger"></Button>
		<Button />
	</>
)

export const DefaultButton = () => <Button>default button</Button>
export const ButtonWithSize = () => (
	<>
		<Button size="large">large button</Button>
		<Button size="small">small button</Button>
	</>
)
export const ButtonWithType = () => (
	<>
		<Button btnType="primary">primary button</Button>
		<Button btnType="danger">danger button</Button>
		<Button btnType="link" href="http://www.baidu.com">
			link button
		</Button>
	</>
)
