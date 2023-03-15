import * as api from 'api/getDocs'

const includeFrame = async (frameTitle: string) => {
	try {
		const res = await api.getDocs(frameTitle)
		if (res.docsType === 'FRAME') return res.contents
		return '포함할 대상이 틀이 아닙니다'
	} catch (err) {
		return '존재하지 않는 틀입니다.'
	}
}

export default includeFrame
