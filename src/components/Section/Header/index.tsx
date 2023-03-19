import * as R from 'react-router-dom'
import * as S from './style'

import Accident from 'assets/accident.svg'
import Club from 'assets/club.svg'
import Create from 'assets/create.svg'
import Search from 'assets/search.svg'
import Student from 'assets/student.svg'
import Teacher from 'assets/teacher.svg'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { userState } from 'context/userState'

const Header = () => {
	const [search, setSearch] = React.useState('')
	const [isHover, setIsHover] = React.useState(false)

	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()

	const navigateSearchResult = () => {
		if (!search.length) alert('검색할 문서명을 입력해주세요!')
		else navigate(`/search/${search}`)
	}

	return (
		<S.HeaderContainer onMouseOver={() => setIsHover(true)} onMouseLeave={() => setIsHover(false)}>
			<S.HeaderWrap>
				<S.HeaderLink to={'/'}>
					<S.HeaderLogo src="/images/logo.png" alt="logo" />
				</S.HeaderLink>
				<S.HeaderSectionWrap>
					<S.HeaderSection to={''}>
						<S.HeaderSectionLogo src={Student} alt="" />
						<S.HeaderSectionText>공지</S.HeaderSectionText>
					</S.HeaderSection>
					&nbsp;&nbsp;&nbsp;
					<S.HeaderSection to={''}>
						<S.HeaderSectionLogo src={Teacher} alt="" />
						<S.HeaderSectionText>학교</S.HeaderSectionText>
					</S.HeaderSection>
					<S.HeaderSection to={''}>
						<S.HeaderSectionLogo src={Accident} alt="" />
						<S.HeaderSectionText>기타</S.HeaderSectionText>
					</S.HeaderSection>
					<S.HeaderSection to={''}>
						<S.HeaderSectionLogo src={Club} alt="" />
						<S.HeaderSectionText>외부 서비스</S.HeaderSectionText>
					</S.HeaderSection>
					{user.id ? (
						<S.HeaderSection to={`/create`}>
							<S.HeaderSectionLogo src={Create} alt="" />
							<S.HeaderSectionText>문서 생성</S.HeaderSectionText>
						</S.HeaderSection>
					) : null}
				</S.HeaderSectionWrap>
				<S.HeaderSearchWrap>
					<S.HeaderSearchForm onSubmit={(e) => e.preventDefault()}>
						<S.HeaderSearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
						<S.HeaderSearchButton onClick={navigateSearchResult}>
							<S.HeaderSearchLogo src={Search} alt="" />
						</S.HeaderSearchButton>
					</S.HeaderSearchForm>
					<S.HeaderLoginWrap>
						{user.id ? (
							<S.HeaderMypageText to="/mypage">마이페이지</S.HeaderMypageText>
						) : (
							<S.HeaderLoginText href="https://auth.bssm.kro.kr/oauth?clientId=a1a16261&redirectURI=http://bumawiki.kro.kr/oauth">
								로그인
							</S.HeaderLoginText>
						)}
					</S.HeaderLoginWrap>
				</S.HeaderSearchWrap>
			</S.HeaderWrap>
			<S.SubHeaderWrap isHover={isHover}>
				<S.SubHeaderPlace>
					<S.HeaderLogo src="/images/logo.png" alt="logo" />
				</S.SubHeaderPlace>
				<S.HeaderSectionWrap>
					<S.SubHeaderSectionWrap>
						<S.SubHeaderSection to="/docs/부마위키%20업데이트%20내용">
							<S.HeaderSectionText display="true">공지사항</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/docs/부마위키%20방명록">
							<S.HeaderSectionText display="true">방명록</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/docs/부마위키%20개인정보처리방침">
							<S.HeaderSectionText>처리방침</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="https://forms.gle/DzAP7XSYH4ubK43FA" target="_blank">
							<S.HeaderSectionText display="true">문의하기</S.HeaderSectionText>
						</S.SubHeaderSection>
					</S.SubHeaderSectionWrap>
					<S.SubHeaderSectionWrap>
						<S.SubHeaderSection to="/student">
							<S.HeaderSectionText display="true">학생</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/teacher">
							<S.HeaderSectionText display="true">선생님</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/club">
							<S.HeaderSectionText display="true">동아리</S.HeaderSectionText>
						</S.SubHeaderSection>
					</S.SubHeaderSectionWrap>
					<S.SubHeaderSectionWrap margin="1.2vw">
						<S.SubHeaderSection to="/frame">
							<S.HeaderSectionText display="true">틀</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/accident">
							<S.HeaderSectionText display="true">사건</S.HeaderSectionText>
						</S.SubHeaderSection>
						<S.SubHeaderSection to="/popular">
							<S.HeaderSectionText display="true">개발예정</S.HeaderSectionText>
						</S.SubHeaderSection>
					</S.SubHeaderSectionWrap>
					<S.SubHeaderSectionWrap>
						<S.SubHeaderSection to="">
							<S.HeaderSectionText display="true">추가예정</S.HeaderSectionText>
						</S.SubHeaderSection>
					</S.SubHeaderSectionWrap>
				</S.HeaderSectionWrap>
			</S.SubHeaderWrap>
		</S.HeaderContainer>
	)
}

export default Header
