import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Alert, { AlertProps, AlertType } from './alert'

const testProps: AlertProps = {
	className: 'extra',
	type: AlertType.Success,
	showClose: false,
	content: '详细说明',
	title: 'this is alert!'
}
describe('alert组件用例', () => {
	it('默认alert用例', () => {
		// queryByText不单单指的.text()内容，也包含title的值
		const wrapper = render(<Alert title={'this is alert!'}></Alert>)
		const element = wrapper.container.querySelector('.alert')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('alert-default')
		const titleElement = wrapper.queryByText('this is alert!') as HTMLElement
		expect(titleElement).toBeInTheDocument()
		expect(titleElement.tagName).toEqual('SPAN')
		const closeIcon = wrapper.container.querySelector(
			'.closeIcon'
		) as HTMLElement
		expect(closeIcon).toBeInTheDocument()
		fireEvent.click(closeIcon)
		expect(element).not.toBeInTheDocument() //点击关闭按钮之后，alert元素就销毁了
	})
	it('自定义alert用例2', () => {
		const wrapper = render(<Alert {...testProps}></Alert>)
		const element = wrapper.container.querySelector('.alert')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('alert-success')
		expect(element).toHaveClass('extra')
		const closeIcon = wrapper.container.querySelector(
			'.closeIcon'
		) as HTMLElement
		expect(closeIcon).not.toBeInTheDocument() //关闭按钮不存在
		const contentEl = screen.getByText('详细说明')
		expect(contentEl).toBeInTheDocument()
	})
})
