import * as C from 'allFiles'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'
import { changeKor } from 'util/changeKor'
import { dateParser } from 'util/dateParser'
import { documentation } from 'util/documentation'
import * as S from '../Doc/style'

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
	const [versionDocs, setVersionDocs] = React.useState({
		contents: '',
		nickName: '',
		thisVersionCreatedAt: '',
		userId: '',
	})
	const [prevContents, setPrevContents] = React.useState('')
	const [nextContents, setNextContents] = React.useState('')
	const [isLoad, setIsLoad] = React.useState(false)

	const getFindDetailVersionDocs = async () => {
		try {
			const res = await axios.get(`/docs/find/${router.title}/version`)
			const Array = res.data.versionDocsResponseDto.reverse()
			setVersionDocs(Array[router.versionId || 0])
			const a = Array[router.versionId || 0].contents,
				b = Array[parseInt(router.versionId as string) + 1 || 1].contents
			setPrevContents(a.replace(b, '').replace(/<\//gi, '?@$?@$'))
			setNextContents(b.replace(a.replace(a.replace(b, ''), ''), '').replace(/<\//gi, '?@$?@$'))
			setIsLoad(true)
		} catch (err) {
			console.log(err)
			return
		}
	}

	const getDocsInfo = async () => {
		try {
			const res = await axios.get(`/docs/find/title/${router.title}`)
			setDocs(res.data)
			getFindDetailVersionDocs()
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
	}, [router.title, router.versionId])
	return (
		<div>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					<S.DocsTitleWrap>
						<S.DocsTitleText>{docs?.title}</S.DocsTitleText>
						<S.DocsMenu>
							<C.DetailBtn />
						</S.DocsMenu>
					</S.DocsTitleWrap>
					<S.Classify>
						<C.Classify>{changeKor(docs?.docsType)}</C.Classify>
					</S.Classify>
					<S.DocsLine />
					<S.DocsContents>
						{isLoad ? (
							<S.DocsContentsLoadWrap>
								<S.LastUpdateDate>
									마지막 수정 : {dateParser(versionDocs.thisVersionCreatedAt)} | 수정자 : {versionDocs.nickName}
								</S.LastUpdateDate>
								<C.AccodianMenu name="코드 내용" isOpen={false}>
									<S.DocsContents>{versionDocs.contents.replace(/<br>/gi, '\n')}</S.DocsContents>
								</C.AccodianMenu>
								<C.AccodianMenu name="수정된 내용" isOpen={false}>
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: prevContents
												.replace(
													prevContents,
													`<span style="background-color:#3FB950;">${prevContents.replace(
														/\?@\$\?@\$/gi,
														'< /'
													)}</span>`
												)
												.replace(/<</gi, `&lt;&lt;`)
												.replace(/>>/gi, `&gt;&gt;`),
										}}></S.DocsContents>
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: nextContents
												.replace(
													nextContents,
													`<span style="background-color:#fe5250;">${nextContents.replace(
														/\?@\$\?@\$/gi,
														'< /'
													)}}</span>`
												)
												.replace(/<</gi, `&lt;&lt;`)
												.replace(/>>/gi, `&gt;&gt;`),
										}}></S.DocsContents>
								</C.AccodianMenu>
								<C.AccodianMenu name="개요">
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: documentation(versionDocs?.contents.replace(/<br>/gi, '\n')),
										}}></S.DocsContents>
								</C.AccodianMenu>
							</S.DocsContentsLoadWrap>
						) : (
							''
						)}
					</S.DocsContents>
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
