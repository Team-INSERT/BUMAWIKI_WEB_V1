import * as C from 'allFiles'
import * as FC from 'util/function/'
import * as S from './style'

import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import DocsType from 'types/docs'

const Docs = () => {
	const router = useParams()
	const [docs, setDocs] = React.useState<DocsType>()
	const [isLoad, setIsLoad] = React.useState(false)

	const getDocsInfo = async () => {
		try {
			const res = await axios.get(`/docs/find/title/${router.title}`)
			setDocs({
				...res.data,
				lastModifiedAt: FC.dateParser(res.data.lastModifiedAt),
			})
			setIsLoad(true)
		} catch (err) {
			if (err instanceof axios.AxiosError) {
				console.log(err)
				alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			}
		}
	}

	React.useEffect(() => {
		getDocsInfo()
		// eslint-disable-next-line
	}, [router.title])

	return (
		<div>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					<S.DocsTitleWrap>
						<S.DocsTitleText>{docs?.title.replace(/&\$\^%/gi, '"')}</S.DocsTitleText>
						<S.DocsMenu>
							<C.DetailBtn />
						</S.DocsMenu>
					</S.DocsTitleWrap>
					<S.Classify>
						<C.Classify>{FC.typeEditor(docs?.docsType as string)}</C.Classify>
					</S.Classify>
					<S.DocsLine />
					<S.DocsContentsWrap>
						{isLoad ? (
							<S.DocsContentsLoadWrap>
								<S.LastUpdateDate>마지막 수정 : {docs?.lastModifiedAt}</S.LastUpdateDate>
								<C.AccodianMenu name="내용">
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: FC.documentation(docs?.contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"') as string),
										}}></S.DocsContents>
								</C.AccodianMenu>
							</S.DocsContentsLoadWrap>
						) : (
							''
						)}
					</S.DocsContentsWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.DocsWrap>
			<C.Footer />
		</div>
	)
}

export default Docs
