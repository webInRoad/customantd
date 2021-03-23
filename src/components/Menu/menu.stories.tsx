import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { Menu, MenuProps } from './menu'
// import { MenuItem } from './menuItem'
export default {
	title: 'menu',
	component: Menu
} as Meta

const Template: Story<MenuProps> = (args) => (
	<Menu {...args}>
		{' '}
		{/* 有问题 */}
		{/* <MenuItem>导航1</MenuItem>
		<MenuItem>导航2</MenuItem> */}
	</Menu>
)

export const defaultMenu = Template.bind({})
defaultMenu.args = {}
