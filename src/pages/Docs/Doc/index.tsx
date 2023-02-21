import * as C from 'allFiles'
import * as FC from 'utils'
import * as S from './style'
import * as api from 'api/getDocs'

import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Docs from 'types/docs'
import { AxiosError } from 'axios'

const initialDocs = {
	id: -1,
	title: '',
	enroll: 0,
	contents: '',
	docsType: '',
	view: -1,
	lastModifiedAt: '',
}

const Doc = () => {
	const router = useParams()
	const [isLoad, setIsLoad] = React.useState(false)
	const [docs, setDocs] = useState<Docs>(initialDocs)

	const { refetch } = useQuery('docs', () => api.getDocs(router.title as string), {
		onSuccess: (res) => {
			setDocs(res)
			setIsLoad(true)
		},
		onError: (err: AxiosError) => {
			if (err.message.includes('404') || err.message.includes('500')) alert('문서를 찾을 수 없습니다! 이름을 확인해주세요.')
			else alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			console.log(err)
		},
	})

	useEffect(() => {
		refetch()
		// eslint-disable-next-line
	}, [router])

	return (
		<div>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					{isLoad ? (
						<>
							<S.DocsTitleWrap>
								<S.DocsTitleText>{docs?.title.replace(/&\$\^%/gi, '"')}</S.DocsTitleText>
								<S.DocsMenu>
									<C.DetailBtn docsId={docs.id} />
								</S.DocsMenu>
							</S.DocsTitleWrap>
							<S.Classify>
								<C.Classify>{FC.typeEditor(docs?.docsType as string)}</C.Classify>
							</S.Classify>
							<S.DocsLine />
							<S.DocsContentsWrap>
								<S.DocsContentsLoadWrap>
									<S.LastUpdateDate>마지막 수정 : {FC.dateParser(docs !== undefined ? docs.lastModifiedAt : '')}</S.LastUpdateDate>
									<C.AccodianMenu name="내용">
										<S.DocsContents
											dangerouslySetInnerHTML={{
												__html: FC.documentation(docs?.contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"') as string),
											}}></S.DocsContents>
									</C.AccodianMenu>
								</S.DocsContentsLoadWrap>
							</S.DocsContentsWrap>
						</>
					) : (
						''
					)}
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.DocsWrap>
			<C.Footer />
		</div>
	)
}

export default Doc
