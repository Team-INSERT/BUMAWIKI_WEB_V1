import * as C from 'allFiles'
import * as api from 'utils/api/getDocs'
import * as S from './style'

import React from 'react'
import { useQuery } from 'react-query'
import Docs from 'types/docs'

const Accident = () => {
	const [accidents, setAccidents] = React.useState([])
	const [allDate] = React.useState<number[]>([])
	const nowDate = new Date()

	useQuery('getAccident', () => api.getBaseDocs('accident'), {
		onSuccess: (res) => {
			const data = res.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setAccidents(data)
		},
		onError: (err) => {
			console.log(err)
			alert('오류가 발생하여 문서를 불러올 수 없습니다.')
		},
	})

	React.useEffect(() => {
		for (let date = nowDate.getFullYear(); date >= 2021; date--) {
			allDate.push(date)
		}
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<C.Header />
			<S.AccidentWrap>
				<C.Board>
					<S.AccidentTitleWrap>
						<S.AccidentTitleText>부마위키:사건/사고</S.AccidentTitleText>
					</S.AccidentTitleWrap>
					<S.AccidentClassify>
						<C.Classify>사건/사고</C.Classify>
					</S.AccidentClassify>
					<S.AccidentLine />
					<S.AccidentListWrap>
						{allDate.map((date) => (
							<C.AccodianMenu name={`${date}년 사건/사고`} key={date}>
								{accidents.map((accident: Docs, index) => (
									<S.AccidentList key={index}>
										{accident.enroll === date ? (
											<S.AccidentListItem>
												<S.AccidentLink to={`/docs/${accident.title}`}>{accident.title}</S.AccidentLink>
											</S.AccidentListItem>
										) : (
											''
										)}
									</S.AccidentList>
								))}
							</C.AccodianMenu>
						))}
					</S.AccidentListWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.AccidentWrap>
			<C.Footer />
		</>
	)
}

export default Accident
