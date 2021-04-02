import React, { useState, DragEvent } from 'react'
import classNames from 'classnames'
export interface DraggerProps {
	onFile: (files: FileList) => void
}

export const Dragger: React.FC<DraggerProps> = (props) => {
	const { onFile, children } = props
	const [isDragOver, setDragOver] = useState(false)
	const className = classNames('uploader-dragger', {
		'is-dragover': isDragOver
	})
	const handleDragOver = (e: DragEvent<HTMLDivElement>, over: boolean) => {
		e.preventDefault()
		setDragOver(over)
	}
	const handleDrop = (e: DragEvent<HTMLDivElement>) => {
		e.preventDefault()
		onFile(e.dataTransfer.files)
	}
	return (
		<div
			className={className}
			onDragOver={(e) => handleDragOver(e, true)}
			onDragLeave={(e) => handleDragOver(e, false)}
			onDrop={(e) => handleDrop(e)}
		>
			{children}
		</div>
	)
}
