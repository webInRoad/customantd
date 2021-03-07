test('test common matchers', () => {
	expect(2 + 2).toBe(4)
	expect(2 + 2).not.toBe(5)
})

test('test boolean', () => {
	expect(2).toBeTruthy()
	expect(null).toBeFalsy()
})
test('test number', () => {
	expect(5).toBeGreaterThan(2)
	expect(2).toBeLessThanOrEqual(2)
})
test('test object', () => {
	expect({ name: '张三' }).toEqual({ name: '张三' })
})
