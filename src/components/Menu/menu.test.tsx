import React from 'react'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import Menu, { MenuProps } from './menu'
import SubMenu from './subMenu'
import MenuItem from './menuItem'
const testProps: MenuProps = {
	defaultIndex: '0',
	className: 'test',
	onSelect: jest.fn()
}

const testVerProps: MenuProps = {
	defaultIndex: '0',
	mode: 'vertical',
	defaultOpenSubMenus: ['4']
}

const generateMenu = (props: MenuProps) => {
	return (
		<Menu {...props}>
			<MenuItem>导航一</MenuItem>
			<MenuItem disabled>导航二</MenuItem>
			<MenuItem>导航三</MenuItem>
			<SubMenu title="下拉导航">
				<MenuItem>下拉一</MenuItem>
			</SubMenu>
			<SubMenu title="默认打开的">
				<MenuItem>下拉二</MenuItem>
			</SubMenu>
		</Menu>
	)
}
const createStyleFile = () => {
	const cssFile: string = `
	.submenu{
		display:none
	}
	.submenu.is-opened {
		display:block
	}
	`
	const style = document.createElement('style')
	style.type = 'text/css'
	style.innerHTML = cssFile
	return style
}
let wrapper: RenderResult,
	wrapper2: RenderResult,
	menuElement: HTMLElement,
	activeElement: HTMLElement,
	disabledElement: HTMLElement
describe('menu 跟 menuItem测试用例', () => {
	beforeEach(() => {
		wrapper = render(generateMenu(testProps))
		wrapper.container.append(createStyleFile())
		menuElement = wrapper.getByTestId('test-menu')
		activeElement = wrapper.getByText('导航一')
		disabledElement = wrapper.getByText('导航二')
	})
	it('默认属性可以正常渲染组件', () => {
		expect(menuElement).toBeInTheDocument()
		expect(menuElement).toHaveClass('menu test')
		// expect(menuElement.getElementsByTagName('li').length).toEqual(3)
		expect(menuElement.querySelectorAll(':scope > li').length).toEqual(5)
		expect(activeElement).toHaveClass('menu-item is-actived')
		expect(disabledElement).toHaveClass('menu-item is-disabled')
	})
	it('点击事件用例', () => {
		const thirdItem = wrapper.getByText('导航三')
		fireEvent.click(thirdItem)
		expect(thirdItem).toHaveClass('is-actived')
		expect(activeElement).not.toHaveClass('is-actived')
		expect(testProps.onSelect).toHaveBeenCalledWith('2')

		// disable menuItem点击事件
		fireEvent.click(disabledElement)
		expect(disabledElement).not.toHaveClass('is-actived')
		expect(testProps.onSelect).not.toHaveBeenCalledWith('1')
	})
	it('垂直menu用例', () => {
		cleanup() //解决Found multiple elements by
		const wrapper = render(generateMenu(testVerProps))
		const menuElement = wrapper.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
	it('submenu测试用例', async () => {
		// 默认下拉不显示
		expect(wrapper.getByText('下拉一')).not.toBeVisible()
		const dropDownElement = wrapper.getByText('下拉导航')
		// 移过去下拉显示
		fireEvent.mouseOver(dropDownElement)
		await waitFor(() => {
			expect(wrapper.queryByText('下拉一')).toBeVisible()
		})
		// 点击触发onSelect，并传递参数3-0
		fireEvent.click(wrapper.getByText('下拉一'))
		expect(testProps.onSelect).toHaveBeenLastCalledWith('3-0')
		// 鼠标移开隐藏
		fireEvent.mouseLeave(dropDownElement)
		await waitFor(() => {
			expect(wrapper.queryByText('下拉一')).not.toBeVisible()
		})
	})
})

describe('测试下拉菜单纵向显示用例', () => {
	beforeEach(() => {
		wrapper2 = render(generateMenu(testVerProps))
		wrapper2.container.append(createStyleFile())
	})
	it('当mode为vertical时，显示为纵向', () => {
		const menuElement = wrapper2.getByTestId('test-menu')
		expect(menuElement).toHaveClass('menu-vertical')
	})
	it('点击时显示', () => {
		const dropDownElement = wrapper2.getByText('下拉一')
		expect(dropDownElement).not.toBeVisible()
		fireEvent.click(wrapper2.getByText('下拉导航'))
		expect(wrapper2.getByText('下拉导航')).toBeVisible()
	})
	it('设置defaultOpenSubMenus的用例', () => {
		expect(wrapper2.getByText('下拉二')).toBeVisible()
	})
})
