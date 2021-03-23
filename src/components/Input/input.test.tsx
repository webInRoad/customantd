import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { Input, InputProps } from './input'

const defaultProps: InputProps = {
	onChange: jest.fn()
}

describe('input commponent test', () => {
	it('默认input用例', () => {
		const wrapper = render(<Input {...defaultProps} placeholder="default" />)
		const element = wrapper.getByPlaceholderText('default') as HTMLInputElement
		expect(element).toBeInTheDocument()
		expect(element).toHaveClass('input-inner')
		fireEvent.change(element, { target: { value: 23 } })
		expect(defaultProps.onChange).toHaveBeenCalled()
		expect(element.value).toEqual('23')
	})
	it('disabled input用例', () => {
		const wrapper = render(<Input disabled placeholder="disabled" />)
		const element = wrapper.getByPlaceholderText('disabled') as HTMLInputElement
		expect(element.disabled).toBeTruthy()
	})
	it('size input用例', () => {
		const wrapper = render(<Input placeholder="size" size="lg" />)
		const element = wrapper.container.querySelector('.input-wrapper')
		expect(element).toHaveClass('input-size-lg')
	})
	it('input前缀与后缀用例', () => {
		const wrapper = render(
			<Input prepend="https://" append=".com" placeholder="pend" />
		)
		const container = wrapper.container.querySelector('.input-wrapper')
		expect(container).toHaveClass(
			'input-group input-group-prepend input-group-append'
		)
		const preElement = wrapper.queryByText('https://')
		expect(preElement).toBeInTheDocument()
		const appendElement = wrapper.queryByText('.com')
		expect(appendElement).toBeInTheDocument()
	})
})
