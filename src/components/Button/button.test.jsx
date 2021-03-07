import React from 'react'
import { render } from '@testing-library/react'
import Button from './button'

// test('test button', () => {
// 	const wrapper = render(<Button>Nice</Button>)
// 	const element = wrapper.queryByText('Nice')
// 	expect(element).toBeTruthy()
// })
describe('test button component', () => {
	it('should render the correct default button', () => {
		const wrapper = render(<Button>Nice</Button>)
		const element = wrapper.queryByText('Nice')
		expect(element).toBeInTheDocument()
		expect(element.tagName).toBe('BUTTON')
		expect(element).toHaveClass('btn btn-default')
	})
})
