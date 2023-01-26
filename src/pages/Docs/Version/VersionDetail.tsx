import * as C from 'allFiles'
import * as FC from 'util/function/'
import * as S from '../Doc/style'

import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getVersionDocs } from 'util/api/docs'

const VersionDetail = () => {
	const router = useParams()
	const [docs, setDocs] = React.useState({
		title: '',
		docsType: '',
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

	useQuery('versionDocs', () => getVersionDocs(router.title as string), {
		onSuccess: (data) => {
			const Array = data.versionDocsResponseDto.reverse()
			setDocs({
				title: data.title,
				docsType: data.docsType,
			})
			setVersionDocs(Array[router.versionId || 0])

			const a = Array[router.versionId || 0].contents
			const b = Array[parseInt(router.versionId as string) + 1 || 1].contents

			setPrevContents(a.replace(b, '').replace(/<\//gi, '?@$?@$'))
			setNextContents(b.replace(a.replace(a.replace(b, ''), ''), '').replace(/<\//gi, '?@$?@$'))
			setIsLoad(true)
		},
		onError: (err) => {
			console.log(err)
			alert('오류가 발생하여 문서를 불러올 수 없습니다.')
		},
	})

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
						<C.Classify>{FC.typeEditor(docs?.docsType as string)}</C.Classify>
					</S.Classify>
					<S.DocsLine />
					<S.DocsContents>
						{isLoad ? (
							<S.DocsContentsLoadWrap>
								<S.LastUpdateDate>
									마지막 수정 : {FC.dateParser(versionDocs.thisVersionCreatedAt)} | 수정자 : {versionDocs.nickName}
								</S.LastUpdateDate>
								<C.AccodianMenu name="코드 내용" isOpen={false}>
									<S.DocsContents>{versionDocs.contents.replace(/<br>/gi, '\n')}</S.DocsContents>
								</C.AccodianMenu>
								<C.AccodianMenu name="수정된 내용" isOpen={false}>
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: prevContents
												.replace(prevContents, `<span style="background-color:#3FB950;">${prevContents.replace(/\?@\$\?@\$/gi, '< /')}</span>`)
												.replace(/<</gi, `&lt;&lt;`)
												.replace(/>>/gi, `&gt;&gt;`),
										}}></S.DocsContents>
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: nextContents
												.replace(nextContents, `<span style="background-color:#fe5250;">${nextContents.replace(/\?@\$\?@\$/gi, '< /')}}</span>`)
												.replace(/<</gi, `&lt;&lt;`)
												.replace(/>>/gi, `&gt;&gt;`),
										}}></S.DocsContents>
								</C.AccodianMenu>
								<C.AccodianMenu name="개요">
									<S.DocsContents
										dangerouslySetInnerHTML={{
											__html: FC.documentation(versionDocs?.contents.replace(/<br>/gi, '\n')),
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

export default VersionDetail
