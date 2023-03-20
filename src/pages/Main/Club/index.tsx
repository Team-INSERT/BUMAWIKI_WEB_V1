import * as C from 'allFiles'
import * as S from './style'
import * as api from 'api/getDocs'

import React from 'react'
import axios from 'axios'
import Docs from 'types/docs.type'
import { useQuery } from 'react-query'
import { Helmet } from 'react-helmet-async'

const Club = () => {
	const [clubs, setClubs] = React.useState([])
	const [freeClubs, setFreeClubs] = React.useState([])

	useQuery('getClub', () => api.getBaseDocs('club'), {
		onSuccess: async (res) => {
			const data = res.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setClubs(data)
			const freeClub = (await axios.get(`/docs/free_club`)).data
			const freeClubData = freeClub.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setFreeClubs(freeClubData)
		},
	})

	return (
		<div>
			<Helmet>
				<title>부마위키 - 동아리</title>
			</Helmet>
			<C.Header />
			<S.ClubWrap>
				<C.Board>
					<S.ClubTitleWrap>
						<S.ClubTitleText>부마위키:동아리</S.ClubTitleText>
					</S.ClubTitleWrap>
					<S.ClubClassify>
						<C.Classify>동아리</C.Classify>
					</S.ClubClassify>
					<S.ClubLine />
					<S.ClubListWrap>
						<C.AccodianMenu name={`전공동아리`}>
							<S.ClubList>
								{clubs.map((club: Docs) => (
									<S.ClubListItem key={club.id}>
										<S.ClubLink to={`/docs/${club.title}`}>{club.title}</S.ClubLink>
									</S.ClubListItem>
								))}
							</S.ClubList>
						</C.AccodianMenu>
					</S.ClubListWrap>
					<S.ClubListWrap>
						<C.AccodianMenu name={`사설동아리`}>
							<S.ClubList>
								{freeClubs.map((club: Docs) => (
									<S.ClubListItem key={club.id}>
										<S.ClubLink to={`/docs/${club.title}`}>{club.title}</S.ClubLink>
									</S.ClubListItem>
								))}
							</S.ClubList>
						</C.AccodianMenu>
					</S.ClubListWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.ClubWrap>
			<C.Footer />
		</div>
	)
}

export default Club
