import React from 'react'

import { Meta, Story } from '@storybook/react'
import Upload, { IUploadProps } from './upload'

export default {
	title: 'upload',
	component: Upload
} as Meta

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
		// return checkSize(file)
		return filePromise(file)
	},
	onChange(file) {
		console.info(file)
	}
}
