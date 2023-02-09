const autoComplete = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
	const selection = e.target.selectionStart
	if (e.target.value[e.target.selectionStart - 1] === '>') {
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
