import * as api from 'api/getDocs'

const includeFrame = async (frameTitle: string) => {
	const res = await api.getDocs(frameTitle)
	return res.contents
}

export default includeFrame
