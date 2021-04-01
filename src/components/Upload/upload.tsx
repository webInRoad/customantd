import React, { useState, useRef } from 'react'
import axios from 'axios'
import { Button } from '../Button/button'
import { UploadList } from './uploadList'

type fileStatus = 'ready' | 'uploading' | 'success' | 'error'
export interface IUploadProps {
	action: string
	defaultFileList?: UploadFile[]
	onRemove?: (file: UploadFile) => void
	beforeUpload?: (file: File) => boolean | Promise<File>
	onProgress?: (percentage: number, file: File) => void
	onSuccess?: (data: any, file: File) => void
	onError?: (err: any, file: File) => void
	onChange?: (file: File) => void
}
export interface UploadFile {
	uid: string
	size: number
	name: string
	status: fileStatus
	percent: number
	raw?: File
	response?: any
	error?: any
}
const Upload: React.FC<IUploadProps> = (props) => {
	const {
		action,
		defaultFileList,
		beforeUpload,
		onProgress,
		onSuccess,
		onError,
		onChange,
		onRemove
	} = props
	const [fileList, setFileList] = useState<UploadFile[]>(defaultFileList || [])
	const inputRef = useRef<HTMLInputElement>(null)
	const handleClick = () => {
		if (inputRef.current) {
			inputRef.current.click()
		}
	}
	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files) {
			return
		}
		const fileList = Array.from(files)
		fileList.forEach((file) => {
			if (!beforeUpload) {
				postFile(file)
			} else {
				const result = beforeUpload(file)
				if (result && result instanceof Promise) {
					result.then((transformFile) => {
						postFile(transformFile)
					})
				} else if (result !== false) {
					postFile(file)
				}
			}
		})
		if (inputRef.current) {
			inputRef.current.value = ''
		}
	}
	const postFile = (file: File) => {
		const formData = new FormData()
		formData.append(file.name, file)
		let _file: UploadFile = {
			uid: Date.now() + 'upload-file',
			size: file.size,
			name: file.name,
			status: 'ready',
			percent: 0,
			raw: file
		}
		setFileList([_file, ...fileList])
		axios
			.post(action, formData, {
				headers: {
					'Content-type': 'multipart/form-data'
				},
				onUploadProgress: (e) => {
					const percentage = Math.round((e.loaded * 100) / e.total) || 0
					if (onProgress) {
						onProgress(percentage, file)
					}
					updateFileList(_file, { percent: percentage, status: 'uploading' })
				}
			})
			.then((data) => {
				if (onSuccess) {
					onSuccess(data, file)
				}
				if (onChange) {
					onChange(file)
				}
				updateFileList(_file, { status: 'success', response: data.data })
			})
			.catch((err) => {
				if (onError) {
					onError(err, file)
				}
				if (onChange) {
					onChange(file)
				}
				updateFileList(_file, { status: 'error', error: err })
			})
	}
	const updateFileList = (
		updateFile: UploadFile,
		updateObject: Partial<UploadFile>
	) => {
		setFileList((prevList) => {
			// console.info(prevList, 'prevList')
			return prevList.map((file) => {
				if (updateFile.uid == file.uid) {
					return { ...file, ...updateObject }
				} else {
					return file
				}
			})
		})
	}
	console.info(fileList, 'fileList')
	const handleRemove = (file: UploadFile) => {
		setFileList((prevList) => {
			return prevList.filter((list) => list.uid !== file.uid)
		})
		if (onRemove) {
			onRemove(file)
		}
	}
	return (
		<>
			<Button btnType="primary" onClick={handleClick}>
				上传
			</Button>
			<input
				type="file"
				style={{ display: 'none' }}
				ref={inputRef}
				onChange={handleChange}
			></input>
			<UploadList fileList={fileList} onRemove={handleRemove} />
		</>
	)
}
export default Upload
