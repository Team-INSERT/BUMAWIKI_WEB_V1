import * as R from 'react-router-dom'
import * as S from './style'

import Accident from 'assets/accident.svg'
import Club from 'assets/club.svg'
import Create from 'assets/create.svg'
import Search from 'assets/search.svg'
import Student from 'assets/student.svg'
import Teacher from 'assets/teacher.svg'
import userState from 'context/userState'
import React from 'react'
import { useRecoilValue } from 'recoil'

const Header = () => {
	const [search, setSearch] = React.useState('')
	const [isLoad, setIsLoad] = React.useState(false)

	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()

	const navigateSearchResult = () => {
		if (!search.length) alert('검색할 문서명을 입력해주세요!')
		else navigate(`/search/${search}`)
	}
	React.useEffect(() => {
		if (user.id) setIsLoad(true)
		console.log(user)
	}, [user])

	return (
		<S.HeaderWrap>
			<S.HeaderLink to={'/'}>
				<S.HeaderLogo src="/images/logo.png" alt="logo" />
			</S.HeaderLink>
			<S.HeaderSectionWrap>
				<S.HeaderSection to={'/student'}>
					<S.HeaderSectionLogo src={Student} alt="" />
					<S.HeaderSectionText>학생</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/teacher'}>
					<S.HeaderSectionLogo src={Teacher} alt="" />
					<S.HeaderSectionText>선생님</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/accident'}>
					<S.HeaderSectionLogo src={Accident} alt="" />
					<S.HeaderSectionText>사건/사고</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/club'}>
					<S.HeaderSectionLogo src={Club} alt="" />
					<S.HeaderSectionText>동아리</S.HeaderSectionText>
				</S.HeaderSection>
				{user.isLogin ? (
					<S.HeaderSection to={`/create`}>
						<S.HeaderSectionLogo src={Create} alt="" />
						<S.HeaderSectionText>문서 생성</S.HeaderSectionText>
					</S.HeaderSection>
				) : (
					''
				)}
			</S.HeaderSectionWrap>
			<S.HeaderSearchWrap>
				<S.HeaderSearchForm onSubmit={(e) => e.preventDefault()}>
					<S.HeaderSearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
					<S.HeaderSearchButton onClick={navigateSearchResult}>
						<S.HeaderSearchLogo src={Search} alt="" />
					</S.HeaderSearchButton>
				</S.HeaderSearchForm>
				<S.HeaderLoginWrap>
					{isLoad ? (
						<S.HeaderMypageText to="/mypage">마이페이지</S.HeaderMypageText>
					) : (
						<S.HeaderLoginText href="https://auth.bssm.kro.kr/oauth?clientId=a1a16261&redirectURI=http://bumawiki.kro.kr/oauth">
							로그인
						</S.HeaderLoginText>
					)}
				</S.HeaderLoginWrap>
			</S.HeaderSearchWrap>
		</S.HeaderWrap>
	)
}

export default Header
