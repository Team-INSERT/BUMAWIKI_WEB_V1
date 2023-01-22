import * as C from 'allFiles'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { changeKor } from 'util/typeEditor'
import { dateParser } from 'util/dateParser'
import { documentation } from 'util/documentation'
import * as S from './style'

const Docs = () => {
	const router = useParams()
	const [docs, setDocs] = React.useState({
		title: '',
		docsType: '',
		enroll: 0,
		contents: '',
		lastModifiedAt: '',
		view: '',
	})
	const [isLoad, setIsLoad] = React.useState(false)

	const getDocsInfo = async () => {
		try {
			const res = await axios.get(`/docs/find/title/${router.title}`)
			setDocs({
				...res.data,
				lastModifiedAt: dateParser(res.data.lastModifiedAt),
			})
			setIsLoad(true)
		} catch (err) {
			if (err instanceof AxiosError) {
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
						<C.Classify>{changeKor(docs?.docsType)}</C.Classify>
					</S.Classify>
					<S.DocsLine />
					<S.DocsContentsWrap>
						{isLoad ? (
							<S.DocsContentsLoadWrap>
								<S.LastUpdateDate>마지막 수정 : {docs.lastModifiedAt}</S.LastUpdateDate>
								<C.AccodianMenu name="내용">
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: documentation(docs?.contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"')),
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
