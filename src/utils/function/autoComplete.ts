const autoComplete = (contents: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
	console.log(e)
	if (e.target.value[e.target.selectionStart - 1] === '>') {
		const selection = e.target.selectionStart
		let text = e.target.value.slice(0, e.target.selectionStart)
		const tag = text.substring(text.lastIndexOf('<') + 1, text.length)

		if (tag.includes('/')) return e.target.value
		text += `</${tag}` + e.target.value.slice(e.target.selectionStart, e.target.value.length)
		setTimeout(() => {
			e.target.selectionStart = selection
			e.target.selectionEnd = selection
		}, 0)
		return text
	}
	return e.target.value
}

export default autoComplete

// const autoComplete = (contents: string, e: React.ChangeEvent<HTMLTextAreaElement>) => {
// 	let text = ''
// 	if (e.target.value.lastIndexOf('>') !== -1 && !e.target.value[e.target.value.lastIndexOf('>') + 1]) {
// 		console.log(e.target.value[e.target.value.lastIndexOf('>') + 1])
// 		const TAG = e.target.value.substring(e.target.value.lastIndexOf('<') + 1, e.target.value.lastIndexOf('>') + 1)
// 		e.target.value += `</${TAG}`

// 		e.target.selectionStart = e.target.value.lastIndexOf('>') + 1
// 		e.target.selectionEnd = e.target.value.lastIndexOf('>') + 1

// 		text += e.target.value
// 	}
// 	return e.target.value
// }

// export default autoComplete
