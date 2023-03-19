import * as C from 'allFiles'
import * as FC from 'utils'
import * as S from './style'
import * as api from 'api/getDocs'

import React, { Suspense, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Docs from 'types/docs.type'
import { AxiosError } from 'axios'
import { decodeContents } from 'utils/document/requestContents'
import { useRecoilValue } from 'recoil'
import { userState } from 'context/userState'
import { Helmet } from 'react-helmet-async'

const Doc = () => {
	const router = useParams()
	const navigate = useNavigate()
	const [isLoad, setIsLoad] = React.useState(false)
	const [docs, setDocs] = useState<Docs>()
	const user = useRecoilValue(userState)

	const { refetch } = useQuery('docs', () => api.getDocs(router.title as string), {
		onSuccess: async (res) => {
			try {
				if (res.contents.indexOf('include(') !== -1) {
					const includeTag = res.contents.substring(res.contents.indexOf('include('), res.contents.indexOf(');') + 2)
					const frames = res.contents.substring(res.contents.indexOf('include('), res.contents.indexOf(');')).replace('include(', '').split(', ')

					let frameValue = ''

					for (const frame of frames) {
						const result = await FC.includeFrame(frame)
						frameValue += `${result}\n`
					}

					setDocs({ ...res, contents: res.contents.replace(includeTag, frameValue) })
					setIsLoad(true)
				} else {
					setDocs(res)
					setIsLoad(true)
				}
			} catch (err) {
				if (err instanceof AxiosError) {
					const { status } = err?.response?.data
					if (status === 404) return alert('오류가 발생했습니다.')
					if (status === 500) return alert('서버에 오류가 발생했습니다.')
					return alert('오류가 발생하여 문서를 불러올 수 없습니다.')
				}
			}
		},
		onError: (err) => {
			if (err instanceof AxiosError && err.response?.status === 404) navigate('/404')
		},
	})

	useEffect(() => {
		refetch()
		// eslint-disable-next-line
	}, [router])

	return (
		<div>
			<Suspense>
				<Helmet>
					<title>
						부마위키 - {docs?.title || ''} ({FC.typeEditor(docs?.docsType || '')})
					</title>
				</Helmet>
			</Suspense>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					{isLoad ? (
						<>
							<S.DocsTitleWrap>
								<S.DocsTitleText>{docs?.title.replace(/&\$\^%/gi, '"')}</S.DocsTitleText>
								{docs?.docsType === 'READONLY' && user.authority !== 'ADMIN' ? null : (
									<S.DocsMenu>
										<C.DetailBtn docsId={docs?.id || -1} />
									</S.DocsMenu>
								)}
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
												__html: FC.documentation(decodeContents(docs?.contents || '')),
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
