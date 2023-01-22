import React from 'react'
import * as C from 'allFiles'
import * as S from './style'
import axios from 'axios'
import Docs from 'types/docs'

const Club = () => {
	const [clubs, setClubs] = React.useState([])
	const [freeClubs, setFreeClubs] = React.useState([])

	const getClubDocs = async () => {
		try {
			const club = await axios.get(`/docs/club`)
			const clubData = club.data.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setClubs(clubData)

			const freeClub = await axios.get(`/docs/freeClub`)
			const freeClubData = freeClub.data.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setFreeClubs(freeClubData)
		} catch (err) {
			if (err instanceof axios.AxiosError) {
				console.log(err)
				alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			}
		}
	}

	React.useEffect(() => {
		getClubDocs()
	}, [])

	return (
		<div>
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
