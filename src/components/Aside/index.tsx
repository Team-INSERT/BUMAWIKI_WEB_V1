import * as S from './style'
import * as FC from 'util/'

import axios from 'axios'
import React from 'react'
import Docs from 'types/docs'

const Aside = () => {
	const [lastModifiedDocs, setLastModifiedDocs] = React.useState([])

	const axiosGetModifiedDocs = async () => {
		try {
			const res = await axios.get('/docs/find/modified')
			setLastModifiedDocs(res.data)
		} catch (err) {
			console.log(err)
		}
	}

	React.useEffect(() => {
		axiosGetModifiedDocs()
	}, [])

	return (
		<S.AsideWrap>
			<S.AsideTitleWrap>
				<S.AsideTitle>최근 수정된 문서</S.AsideTitle>
			</S.AsideTitleWrap>
			{lastModifiedDocs.map((docs: Docs) => (
				<S.AsideDocWrap key={docs.id}>
					<S.AsideList to={`/docs/${docs.title}`}>{FC.asideFormat(docs.title, docs.docsType)}</S.AsideList>
					<S.AsideLastModified>&nbsp;― {FC.getLastDate(docs.lastModifiedAt)}</S.AsideLastModified>
				</S.AsideDocWrap>
			))}
		</S.AsideWrap>
	)
}

export default Aside
