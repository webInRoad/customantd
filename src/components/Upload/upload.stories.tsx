import React from 'react'

import { Meta, Story } from '@storybook/react'
import Upload, { IUploadProps, UploadFile } from './upload'

export default {
	title: 'upload',
	component: Upload
} as Meta

const defaultUploadList: UploadFile[] = [
	{
		uid: '123',
		size: 1234,
		name: 'hello.md',
		status: 'uploading',
		percent: 30
	},
	{ uid: '122', size: 1234, name: 'xyz.md', status: 'success', percent: 30 },
	{ uid: '121', size: 1234, name: 'eyiha.md', status: 'error', percent: 30 }
]
const checkSize = (file: File) => {
	if (Math.round(file.size / 1024) > 50) {
		alert('文件太大')
		return false
	}
	return true
}

const filePromise = (file: File) => {
	const newFile = new File([file], 'new_name.docx', { type: file.type })
	return Promise.resolve(newFile)
}
const Template: Story<IUploadProps> = (args) => <Upload {...args} />

export const defaultUpload = Template.bind({})
defaultUpload.args = {
	action: 'https://jsonplaceholder.typicode.com/posts',
	// action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
	defaultFileList: defaultUploadList,
	name: 'new',
	headers: { 'X-sdp-app-id': '3360324' },
	data: { key: 'value' },
	withCredentials: true,
	accept: '.jpg',
	multiple: true,
	onRemove() {
		console.info(1212)
	},
	onProgress(percentage, file) {
		console.info(percentage, file)
	},
	onSuccess(data, file) {
		console.info(data, file)
	},
	onError(err, file) {
		console.info(err, file)
	},
	beforeUpload(file) {
		return checkSize(file)
		// return filePromise(file)
	},
	onChange(file) {
		console.info(file)
	}
}
