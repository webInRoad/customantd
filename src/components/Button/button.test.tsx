import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Button, ButtonProps, ButtonSize, ButtonType } from './button'
const defaultProps: ButtonProps = {
	onClick: jest.fn()
}
const testProps: ButtonProps = {
	btnType: 'primary',
	size: 'lg',
	className: 'extra'
}
const disabledProps: ButtonProps = {
	disabled: true,
	onClick: jest.fn()
}
// test('test button', () => {
// 	const wrapper = render(<Button>Nice</Button>)
// 	const element = wrapper.queryByText('Nice')
// 	expect(element).toBeTruthy()
// })
describe('test button component', () => {
	it('默认按钮用例', () => {
		const wrapper = render(<Button {...defaultProps}>Nice</Button>)
		// const element = wrapper.getByText('Nice')
		const element = wrapper.queryByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.tagName).toBe('BUTTON')
		expect(element).toHaveClass('btn btn-default')
		fireEvent.click(element)
		expect(defaultProps.onClick).toHaveBeenCalled()
	})
	it('自定义按钮用例', () => {
		const wrapper = render(<Button {...testProps}>Nice</Button>)
		const element = wrapper.queryByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn-large btn-primary extra ')
	})
	it('类型为link并且带有href属性按钮用例', () => {
		const wrapper = render(
			<Button href="http://www.baidu.com" btnType={'link'}>
				Link
			</Button>
		)
		const element = wrapper.queryByText('Link')
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('btn btn-link')
	})
	it('设置disabled为true按钮用例', () => {
		const wrapper = render(<Button {...disabledProps}>Nice</Button>)
		const element = wrapper.queryByText('Nice') as HTMLButtonElement
		expect(element).toBeInTheDocument()
		expect(element.disabled).toBeTruthy()
		fireEvent.click(element)
		expect(disabledProps.onClick).not.toHaveBeenCalled()
	})
})
