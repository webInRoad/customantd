import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { AutoComplete, AutoCompleteProps } from './autoComplete'
export default {
	title: 'autoComplete',
	component: AutoComplete
} as Meta
const ballData = [
	'volleyball',
	'table tennis',
	'basketball',
	'soccer',
	'badminton'
]
const Template: Story<AutoCompleteProps> = (args) => (
	<AutoComplete {...args}></AutoComplete>
)
const filterData = (item: string) => {
	return ballData.filter((data) => data.includes(item))
}
export const defaultAutoComplete = Template.bind({})

defaultAutoComplete.args = {
	onChange: filterData
}
