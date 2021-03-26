import React, { RefObject, useEffect } from 'react'

function useClickOutside(ref: RefObject<HTMLElement>, handler: Function) {
	useEffect(() => {
		const listener = (event: MouseEvent) => {
			if (!ref.current || ref.current.contains(event.target as HTMLElement)) {
				return
			} else {
				handler(event)
			}
		}
		document.addEventListener('click', listener)
		return () => {
			document.removeEventListener('click', listener)
		}
	})
}
export default useClickOutside