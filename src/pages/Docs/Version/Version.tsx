import * as C from 'allFiles'
import * as api from 'api/getDocs'
import * as FC from 'utils'
import * as S from '../Doc/style'
import * as V from './style'

import React from 'react'
import { useQuery } from 'react-query'
import { useParams } from 'react-router-dom'
import { VersionDocs } from 'types/version.type'
import { Helmet } from 'react-helmet-async'

const Version = () => {
	const router = useParams()
	const [version, setVersion] = React.useState([])
	const [isLoad, setIsLoad] = React.useState(false)
	const [docsName, setDocsName] = React.useState()

	useQuery('versionDocs', () => api.getVersionDocs(router.title as string), {
		onSuccess: (data) => {
			setVersion(data.versionDocsResponseDto.reverse())
			setDocsName(data.docsResponseDto.title)
			setIsLoad(true)
		},
	})

	return (
		<>
			<Helmet>
				<title>부마위키 - 기록 : {docsName || ''}</title>
			</Helmet>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					<S.DocsTitleWrap>
						<S.DocsTitleText>문서 수정 기록 : {docsName}</S.DocsTitleText>
					</S.DocsTitleWrap>
					<S.DocsLine />
					<S.DocsContentsWrap>
						<ul>
							{isLoad ? (
								<>
									{version.map((ver: VersionDocs, index: number) => (
										<V.VersionList key={index}>
											<span>
												<V.VersionLink to={`/version/${router.title}/detail/${index}`}>{FC.dateParser(ver.thisVersionCreatedAt)}</V.VersionLink>
											</span>
											<span>
												작성자 : <V.VersionLink to={`/user/${ver.userId}`}>{ver.nickName.replace('박우빈', '이채우')}</V.VersionLink>
											</span>
										</V.VersionList>
									))}
								</>
							) : (
								''
							)}
						</ul>
					</S.DocsContentsWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.DocsWrap>
			<C.Footer />
		</>
	)
}

export default Version
