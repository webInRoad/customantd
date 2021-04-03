import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor
} from '@testing-library/react'
import { Upload, IUploadProps } from './upload'
jest.mock('../Icon/icon', () => {
	return (data: {
		icon:
			| boolean
			| React.ReactChild
			| React.ReactFragment
			| React.ReactPortal
			| null
			| undefined
	}) => {
		return <span>{data.icon}</span>
	}
})
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const testProps: IUploadProps = {
	action: 'xxx.com',
	onSuccess: jest.fn(),
	onChange: jest.fn()
}

let wrapper: RenderResult, fileInput: HTMLInputElement, uploadArea: HTMLElement
const testFile = new File(['aaa'], 'test.jpg', { type: 'image/png' })
describe('upload测试用例', () => {
	beforeEach(() => {
		wrapper = render(<Upload {...testProps}>Click to upload</Upload>)
		fileInput = wrapper.container.querySelector(
			'.file-input'
		) as HTMLInputElement
		uploadArea = wrapper.queryByText('Click to upload') as HTMLElement
	})
	it('basic upload', async () => {
		const { queryByText } = wrapper
		mockAxios.post.mockImplementation(() => Promise.resolve({ data: 'cool' }))
		expect(uploadArea).toBeInTheDocument()
		expect(fileInput).not.toBeVisible()
		fireEvent.change(fileInput, { target: { files: [testFile] } })
		// expect(queryByText('spinner')).toBeInTheDocument()
		await waitFor(() => {
			expect(queryByText('test.jpg')).toBeInTheDocument()
		})
		expect(queryByText('check-circle')).toBeInTheDocument()
		expect(testProps.onSuccess).toHaveBeenCalledWith({ data: 'cool' }, testFile)
		expect(testProps.onChange).toHaveBeenCalledWith(testFile)
	})
})
