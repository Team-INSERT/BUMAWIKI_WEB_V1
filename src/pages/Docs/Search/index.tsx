import * as C from 'allFiles'
import * as R from 'react-router-dom'
import * as S from './style'
import * as FC from 'util/function/'

import Docs from 'types/docs'
import React from 'react'
import { useQuery } from 'react-query'
import { findDocs } from 'util/api/docs'

const Search = () => {
	const router = R.useParams()
	const navigate = R.useNavigate()
	const [result, setResult] = React.useState([])
	const [isLoad, setIsLoad] = React.useState(false)

	useQuery('findDocs', () => findDocs(router.title as string), {
		onSuccess: (data) => {
			if (data.length === 1) navigate(`/docs/${data[0].title}`)
			setResult(data)
			setIsLoad(true)
		},
		onError: (err) => {
			alert('검색 도중 오류가 발생했습니다.')
			navigate('/')
			console.log(err)
		},
	})

	return (
		<>
			<C.Header />
			<S.SearchWrap>
				<C.Board>
					<S.SearchTitleWrap>
						<span>"{router.result}" 검색결과</span>
					</S.SearchTitleWrap>
					<S.Classify>
						<C.Classify>검색</C.Classify>
					</S.Classify>
					<S.SearchLine />
					<S.SearchResult>
						<S.SearchList>
							{isLoad ? (
								<>
									{result.map((result: Docs, index) => (
										<S.SearchListItem>
											<S.SearchLink key={index} className="link" to={`/docs/${result.title}`}>
												{result.title} — ( {FC.typeEditor(result.docsType)},{result.enroll} )
											</S.SearchLink>
										</S.SearchListItem>
									))}
								</>
							) : (
								<div>
									<span>아직 "{router.result}" 문서는 없습니다.</span>
									<br />
									<br />
									<R.Link to={`/create?name=${router.result}`} style={{ textDecoration: 'none', color: 'blue' }}>
										지금 문서를 생성해보세요
									</R.Link>
								</div>
							)}
						</S.SearchList>
					</S.SearchResult>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.SearchWrap>
			<C.Footer />
		</>
	)
}

export default Search
