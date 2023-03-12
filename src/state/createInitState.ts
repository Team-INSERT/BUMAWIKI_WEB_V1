const createInitState = {
	title: decodeURI(window.location.search.replace('?name=', '')) || '',
	contents: '',
	docsType: '',
	enroll: -1,
	files: [],
}

export default createInitState
