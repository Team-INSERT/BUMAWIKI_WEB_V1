import * as S from './style'
import * as FC from 'util/function/'

import axios from 'axios'
import React from 'react'
import Docs from 'types/docs'
import { useQuery } from 'react-query'

const Aside = () => {
	const { data } = useQuery('lastModifiedDocs', () => axios.get('/docs/find/modified'), {
		onError: (err) => {
			console.log(err)
		},
	})

	return (
		<S.AsideWrap>
			<S.AsideTitleWrap>
				<S.AsideTitle>최근 수정된 문서</S.AsideTitle>
			</S.AsideTitleWrap>
			{data?.data.map((docs: Docs) => (
				<S.AsideDocWrap key={docs.id}>
					<S.AsideList to={`/docs/${docs.title}`}>{FC.asideFormat(docs.title, docs.docsType)}</S.AsideList>
					<S.AsideLastModified>&nbsp;― {FC.getLastDate(docs.lastModifiedAt)}</S.AsideLastModified>
				</S.AsideDocWrap>
			))}
		</S.AsideWrap>
	)
}

export default Aside
