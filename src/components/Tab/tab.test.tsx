import React from 'react'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import Tabs, { ITabsProps } from './tabs'
import TabItem from './tabItem'
import MenuItem from '../Menu/menuItem'
const testProps: ITabsProps = {
	defaultIndex: 0,
	className: 'test',
	onSelect: jest.fn()
}

const testVerProps: ITabsProps = {
	defaultIndex: 0,
	type: 'card',
	mode: 'vertical'
}

const generateMenu = (props: ITabsProps) => {
	return (
		<Tabs {...props}>
			<TabItem label={'card1'}>第一个tabItem</TabItem>
			<TabItem label="card2">第二个tabItem</TabItem>
			<TabItem label="disabled" disabled>
				不允许tabItem
			</TabItem>
		</Tabs>
	)
}
let wrapper: RenderResult,
	tabElement: HTMLElement,
	activeElement: HTMLElement,
	activeContent: HTMLElement,
	disabledElement: HTMLElement
describe('tab标签测试用例', () => {
	beforeEach(() => {
		wrapper = render(generateMenu(testProps))
		tabElement = wrapper.getByTestId('test-tabs')
		activeElement = wrapper.getByText('card1')
		activeContent = wrapper.getByText('第一个tabItem')
		disabledElement = wrapper.getByText('disabled')
	})
	it('默认显示用例', () => {
		expect(tabElement).toBeInTheDocument()
		expect(tabElement).toHaveClass('tabs test')
		expect(activeElement).toBeInTheDocument()
		expect(activeElement).toHaveClass('tab-item is-actived')
		expect(disabledElement).toHaveClass('tab-item is-disabled')
		expect(tabElement.querySelectorAll(':scope li').length).toEqual(3)
	})
	it('点击相关用例', () => {
		const secondElement = wrapper.getByText('card2')
		fireEvent.click(secondElement)
		expect(secondElement).toHaveClass('tab-item is-actived')
		const secodeContent = wrapper.getByText('第二个tabItem')
		expect(secodeContent).toBeInTheDocument()
		expect(activeElement).not.toHaveClass('is-actived')
		expect(activeContent).not.toBeInTheDocument()

		//disabled的点击事件 验证disabled时点击无效
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('tab-item is-actived')
		const disabledContent = wrapper.queryByText('不允许tabItem') //getByText会报可能为undefined的错
		expect(disabledContent).not.toBeInTheDocument()
	})
	it('非默认的用例', () => {
		cleanup()
		const wrapper2: RenderResult = render(generateMenu(testVerProps))
		const tabElement2 = wrapper2.getByTestId('test-tabs')
		expect(tabElement2).toHaveClass('tabs-vertical tabs-card')
	})
})
