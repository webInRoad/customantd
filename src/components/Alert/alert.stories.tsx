import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Alert, AlertProps } from './alert'
export default {
	title: 'alert组件',
	component: Alert
} as Meta

const Template: Story<AlertProps> = (args) => <Alert {...args}></Alert>

export const defaultAlert = Template.bind({})
defaultAlert.args = {
	title: 'this is alert!'
}

export const contentAlert = Template.bind({})
contentAlert.args = {
	title: 'this is alert!',
	content: 'this is a long description'
}

export const closeAlert = Template.bind({})
closeAlert.args = {
	title: 'this is alert!',
	content: 'this is a long description',
	showClose: false
}
