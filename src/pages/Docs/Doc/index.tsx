import * as C from 'allFiles'
import * as FC from 'utils'
import * as S from './style'
import * as api from 'api/getDocs'

import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import Docs from 'types/docs.type'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet'

const Doc = () => {
	const router = useParams()
	const navigate = useNavigate()
	const [isLoad, setIsLoad] = React.useState(false)
	const [docs, setDocs] = useState<Docs>()

	const { refetch } = useQuery('docs', () => api.getDocs(router.title as string), {
		onSuccess: (res) => {
			setDocs(res)
			setIsLoad(true)
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
			<Helmet>
				<meta property="og:title" content={`부마위키 - ${docs?.title} (${FC.typeEditor(docs?.docsType || '')})`} />
				<meta property="og:image" content="images/meta-img.png" />
				<meta property="og:description" content={`${docs?.contents.slice(0, 20)}...`} />
				<link href="images/icon.ico" rel="shortcut icon" type="image/x-icon" />
				<title>{/* 부마위키 - {docs?.title} ({FC.typeEditor(docs?.docsType || '')}) */}</title>
			</Helmet>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					{isLoad ? (
						<>
							<S.DocsTitleWrap>
								<S.DocsTitleText>{docs?.title.replace(/&\$\^%/gi, '"')}</S.DocsTitleText>
								<S.DocsMenu>
									<C.DetailBtn docsId={docs?.id || -1} />
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
