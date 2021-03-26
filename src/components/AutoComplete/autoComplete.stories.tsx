import React from 'react'
import { Meta, Story } from '@storybook/react/types-6-0'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
export default {
	title: 'autoComplete',
	component: AutoComplete
} as Meta
interface ballDataProps {
	name: string
	num: number
}

interface githubUser {
	id: string
	login: string
	url?: string
	avatar_url?: string
}
// const ballData = [
// 	'volleyball',
// 	'table tennis',
// 	'basketball',
// 	'soccer',
// 	'badminton'
// ]
const ballData = [
	{ name: 'volleyball', num: 23 },
	{ name: 'table tennis', num: 22 },
	{ name: 'basketball', num: 12 },
	{ name: 'soccer', num: 32 },
	{ name: 'badminton', num: 17 }
]
const Template: Story<AutoCompleteProps> = (args) => (
	<AutoComplete {...args}></AutoComplete>
)
// const renderOption = (item: DataSourceType) => {
// 	const data = item as DataSourceType<ballDataProps> //断言
// 	return (
// 		<>
// 			<h2>Name:{data.name}</h2>
// 			<p>人数:{data.num}</p>
// 		</>
// 	)
// }

const renderOption = (item: DataSourceType) => {
	const data = item as DataSourceType<githubUser> //断言
	return (
		<>
			{/* <img
				src={data.avatar_url}
				style={{ width: '50px', borderRadius: '50%' }}
			/> */}
			<h2>{data.name}</h2>
		</>
	)
}
const filterData = (item: DataSourceType) => {
	return ballData.filter((data) => data.name.includes(item.name))
}

// const filterData = (query: DataSourceType) => {
// 	return fetch(`https://api.github.com/search/users?q=${query.name}`)
// 		.then((res) => res.json())
// 		.then(({ items }) => {
// 			console.info(items, 'items')
// 			return (
// 				items &&
// 				items.length &&
// 				items.slice(0, 10).map((item: any) => ({ name: item.login, ...item }))
// 			)
// 		})
// }
const onSelect = (item: DataSourceType) => {
	alert(item.name)
}
export const defaultAutoComplete = Template.bind({})

defaultAutoComplete.args = {
	style: { width: '300px' },
	onChange: filterData,
	renderOption,
	onSelect
}
