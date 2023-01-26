const getCookie = (cName: string) => {
	cName = cName + '='
	var cookieData = document.cookie
	var start = cookieData.indexOf(cName)
	var cValue = ''
	if (start !== -1) {
		start += cName.length
		var end = cookieData.indexOf(';', start)
		if (end === -1) end = cookieData.length
		cValue = cookieData.substring(start, end)
	}
	return unescape(cValue)
}

export default getCookie
