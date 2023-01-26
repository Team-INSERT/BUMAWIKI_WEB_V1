import * as C from 'allFiles'
import * as FC from 'util/function/'
import * as S from './style'

import React from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
import { getDocs } from 'util/api/docs'

const Docs = () => {
	const router = useParams()
	const [isLoad, setIsLoad] = React.useState(false)

	const { data } = useQuery('docs', () => getDocs(router.title as string), {
		onSuccess: () => setIsLoad(true),
		onError: (err) => {
			alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			console.log(err)
		},
	})

	return (
		<div>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					{isLoad ? (
						<>
							<S.DocsTitleWrap>
								<S.DocsTitleText>{data.title.replace(/&\$\^%/gi, '"')}</S.DocsTitleText>
								<S.DocsMenu>
									<C.DetailBtn />
								</S.DocsMenu>
							</S.DocsTitleWrap>
							<S.Classify>
								<C.Classify>{FC.typeEditor(data.docsType as string)}</C.Classify>
							</S.Classify>
							<S.DocsLine />
							<S.DocsContentsWrap>
								<S.DocsContentsLoadWrap>
									<S.LastUpdateDate>마지막 수정 : {FC.dateParser(data.lastModifiedAt)}</S.LastUpdateDate>
									<C.AccodianMenu name="내용">
										<S.DocsContents
											dangerouslySetInnerHTML={{
												__html: FC.documentation(data.contents.replace(/<br>/gi, '\n').replace(/&\$\^%/gi, '"') as string),
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

export default Docs
