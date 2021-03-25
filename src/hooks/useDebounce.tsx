import { useState, useEffect } from 'react'

function useDebounce(value: any, delay: number = 300) {
	const [debounceValue, setDebounceValue] = useState<string>(value)
	useEffect(() => {
		const handler = setTimeout(() => {
			setDebounceValue(value)
		}, delay)
		return () => {
			clearTimeout(handler)
		}
	}, [value, delay])
	return debounceValue
}

export default useDebounce
