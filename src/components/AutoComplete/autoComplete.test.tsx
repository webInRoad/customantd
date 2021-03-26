import React from 'react'
import { config } from 'react-transition-group'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { AutoComplete, AutoCompleteProps, DataSourceType } from './autoComplete'
config.disabled = true
const ballData = [
	{ name: 'volleyball', num: 23 },
	{ name: 'table tennis', num: 22 },
	{ name: 'basketball', num: 12 },
	{ name: 'soccer', num: 32 },
	{ name: 'badminton', num: 17 }
]
const testProps: AutoCompleteProps = {
	onChange: (item: DataSourceType) => {
		console.info(item, 'item')
		return ballData.filter((data) => data.name.includes(item.name))
	},
	onSelect: jest.fn(),
	placeholder: 'autoComplete'
}
let wrapper: RenderResult, inputNode: HTMLInputElement
describe('autoComplete组件', () => {
	beforeEach(() => {
		wrapper = render(<AutoComplete {...testProps} />)
		inputNode = wrapper.getByPlaceholderText('autoComplete') as HTMLInputElement
	})
	it('基本功能用例', async () => {
		fireEvent.change(inputNode, { target: { value: 'ball' } })
		await waitFor(() => {
			expect(wrapper.getByText('volleyball')).toBeVisible()
		})
		expect(wrapper.container.querySelectorAll('.item').length).toEqual(2)
		fireEvent.click(wrapper.queryByText('volleyball') as HTMLElement)
		expect(testProps.onSelect).toHaveBeenCalledWith({
			name: 'volleyball',
			num: 23
		})
		expect(wrapper.queryByText('volleyball')).not.toBeInTheDocument()
		expect(inputNode.value).toEqual('volleyball')
	})
	it('键盘用例', async () => {
		fireEvent.change(inputNode, { target: { value: 'ball' } })
		await waitFor(() => {
			expect(wrapper.getByText('volleyball')).toBeVisible()
		})
		const firstElement = wrapper.queryByText('volleyball')
		const secondElement = wrapper.queryByText('basketball')
		fireEvent.keyDown(inputNode, { keyCode: 40 })
		expect(firstElement).toHaveClass('is-active')
		fireEvent.keyDown(inputNode, { keyCode: 40 })
		expect(secondElement).toHaveClass('is-active')
		fireEvent.keyDown(inputNode, { keyCode: 38 })
		expect(firstElement).toHaveClass('is-active')
		fireEvent.keyDown(inputNode, { keyCode: 13 })
		expect(testProps.onSelect).toHaveBeenCalledWith({
			name: 'volleyball',
			num: 23
		})
		expect(firstElement).not.toBeInTheDocument()
	})
	it('点击收起下拉用例', async () => {
		fireEvent.change(inputNode, { target: { value: 'ball' } })
		await waitFor(() => {
			expect(wrapper.getByText('volleyball')).toBeVisible()
		})
		fireEvent.click(document)
		expect(wrapper.queryByText('volleyball')).not.toBeInTheDocument()
	})
})
