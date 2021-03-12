import React from 'react'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import MenuItem from './menuItem'
const testProps: MenuProps = {
	defaultIndex: 0,
	className: 'test',
	onSelect: jest.fn()
}

const testVerProps: MenuProps = {
	defaultIndex: 0,
	mode: 'vertical'
}

const generateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>导航一</MenuItem>
			<MenuItem disabled>导航二</MenuItem>
			<MenuItem>导航三</MenuItem>
		</Menu>
	)
}
let wrapper: RenderResult,
	menuElement: HTMLElement,
	activeElement: HTMLElement,
	disabledElement: HTMLElement
describe('menu 跟 menuItem测试用例', () => {
	beforeEach(() => {
		wrapper = render(generateMenu(testProps))
		menuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('导航一')
		disabledElement = wrapper.getByText('导航二')
	})
	it('默认属性可以正常渲染组件', () => {
		expect(menuElement).toBeInTheDocument()
		expect(menuElement).toHaveClass('menu test')
		expect(menuElement.getElementsByTagName('li').length).toEqual(3)
		expect(activeElement).toHaveClass('menu-item is-actived')
		expect(disabledElement).toHaveClass('menu-item is-disabled')
	})
	it('点击事件用例', () => {
		const thirdItem = wrapper.getByText('导航三')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-actived')
		expect(activeElement).not.toHaveClass('is-actived')
		expect(testProps.onSelect).toHaveBeenCalledWith(2)

		// disable menuItem点击事件
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('is-actived')
		expect(testProps.onSelect).not.toHaveBeenCalledWith(1)
	})
	it('垂直menu用例', () => {
		cleanup() //解决Found multiple elements by
		const wrapper = render(generateMenu(testVerProps))
		const menuElement = wrapper.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
})
