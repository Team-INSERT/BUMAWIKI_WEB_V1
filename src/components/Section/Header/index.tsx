import * as R from 'react-router-dom'
import * as S from './style'

import React from 'react'
import { useRecoilValue } from 'recoil'
import userState from 'recoil/userState'

const Header = () => {
	const [search, setSearch] = React.useState('')
	const [isLoad, setIsLoad] = React.useState(false)

	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()

	const navigateSearchResult = () => {
		if (search.length === 0) {
			alert('검색할 문서명을 입력해주세요!')
		} else {
			navigate(`/search/${search}`)
			window.location.reload()
		}
	}
	React.useEffect(() => {
		if (user.id) setIsLoad(true)
	}, [user])

	return (
		<S.HeaderWrap>
			<S.HeaderLink to={'/'}>
				<S.HeaderLogo src="/images/logo.png" alt="logo" />
			</S.HeaderLink>
			<S.HeaderSectionWrap>
				<S.HeaderSection to={'/student'}>
					<S.HeaderSectionLogo src={require('assets/student.svg').default} alt="" />
					<S.HeaderSectionText>학생</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/teacher'}>
					<S.HeaderSectionLogo src={require('assets/teacher.svg').default} alt="" />
					<S.HeaderSectionText>선생님</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/accident'}>
					<S.HeaderSectionLogo src={require('assets/accident.svg').default} alt="" />
					<S.HeaderSectionText>사건/사고</S.HeaderSectionText>
				</S.HeaderSection>
				<S.HeaderSection to={'/club'}>
					<S.HeaderSectionLogo src={require('assets/club.svg').default} alt="" />
					<S.HeaderSectionText>동아리</S.HeaderSectionText>
				</S.HeaderSection>
				{user.isLogin ? (
					<S.HeaderSection to={`/create`}>
						<S.HeaderSectionLogo src={require('assets/create.svg').default} alt="" />
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
						<S.HeaderSearchLogo src={require('assets/search.svg').default} alt="" />
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
