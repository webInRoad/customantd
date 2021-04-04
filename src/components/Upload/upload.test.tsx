import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import axios from 'axios'
import {
	cleanup,
	fireEvent,
	render,
	RenderResult,
	waitFor,
	createEvent
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
		onClick: any
	}) => {
		return <span onClick={data.onClick}>{data.icon}</span>
	}
})
jest.mock('axios')
const mockAxios = axios as jest.Mocked<typeof axios>
const testProps: IUploadProps = {
	action: 'xxx.com',
	onSuccess: jest.fn(),
	onChange: jest.fn(),
	onRemove: jest.fn(),
	drag: true
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
		// mockAxios.post.mockImplementation(() => Promise.resolve({ data: 'cool' }))
		mockAxios.post.mockResolvedValue({ data: 'cool' })
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

		//remove
		expect(queryByText('times')).toBeInTheDocument()
		fireEvent.click(wrapper.getByText('times'))
		// fireEvent.click(queryByText('times') as HTMLElement) //等价于上面
		expect(queryByText('test.jpg')).not.toBeInTheDocument()
		expect(testProps.onRemove).toHaveBeenCalledWith(
			expect.objectContaining({
				raw: testFile,
				status: 'success',
				name: 'test.jpg'
			})
		)
	})
	it('drag and drop test', async () => {
		const fileList = [testFile]
		fireEvent.dragOver(uploadArea)
		expect(uploadArea).toHaveClass('is-dragover')
		fireEvent.dragLeave(uploadArea)
		expect(uploadArea).not.toHaveClass('is-dragover')
		const mockDropEvent = createEvent.drop(uploadArea)
		Object.defineProperty(mockDropEvent, 'dataTransfer', {
			value: {
				files: fileList
			}
		})
		fireEvent(uploadArea, mockDropEvent)
		// fireEvent.drop(uploadArea, { dataTransfer: { files: [testFile] } })
		await waitFor(() => {
			expect(wrapper.queryByText('test.jpg')).toBeInTheDocument()
		})
		// expect(testProps.onSuccess).toHaveBeenCalledWith('cool', testFile)
		// expect(testProps.onSuccess).toHaveBeenCalled()
	})
})
