import * as C from 'allFiles'
import * as FC from 'util/'
import * as S from '../Doc/style'
import * as V from './style'

import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

const Version = () => {
	const router = useParams()
	const [version, setVersion] = React.useState([])
	const [isLoad, setIsLoad] = React.useState(false)

	const getFindVersionDocs = async () => {
		try {
			const res = await axios.get(`docs/find/${router.title}/version`)
			setVersion(res.data.versionDocsResponseDto.reverse())
			console.log(res.data.versionDocsResponseDto)
			setIsLoad(true)
		} catch (err) {
			console.log(err)
			alert('오류가 발생하여 문서를 불러올 수 없습니다.')
		}
	}

	React.useEffect(() => {
		getFindVersionDocs()
		// eslint-disable-next-line
	}, [router.title])
	return (
		<>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					<S.DocsTitleWrap>
						<S.DocsTitleText>문서 수정 기록</S.DocsTitleText>
					</S.DocsTitleWrap>
					<S.DocsLine />
					<S.DocsContentsWrap>
						<ul>
							{isLoad ? (
								<>
									{version.map((ver: any, index: number) => (
										<V.VersionList>
											<span>
												<V.VersionLink to={`/version/${router.title}/detail/${index}`}>{FC.dateParser(ver.thisVersionCreatedAt)}</V.VersionLink>
											</span>
											<span>
												작성자 : <V.VersionLink to={`/user/${ver.userId}`}>{ver.nickName}</V.VersionLink>
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
