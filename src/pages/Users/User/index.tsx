import * as C from 'allFiles'
import * as FC from 'utils'
import * as S from './style'
import * as api from 'api/user'

import React from 'react'
import { useParams } from 'react-router-dom'
import Contributors from 'types/contributors.type'
import { useQuery } from 'react-query'
import UserType from 'types/user.type'
import { useRecoilValue } from 'recoil'
import { userState } from 'context/userState'
import { Helmet } from 'react-helmet-async'

const User = () => {
	const userInfo = useRecoilValue(userState)
	const [user, setUser] = React.useState<UserType>()
	const router = useParams()
	useQuery('otherUser', () => api.getOtherUser(parseInt(router.id as string)), {
		onSuccess: (data) => setUser(data),
	})

	return (
		<div>
			<Helmet>
				<title>부마위키 - 유저</title>
			</Helmet>
			<C.Header />
			<S.UserWrap>
				<C.Board>
					<S.UserTitleWrap>
						<S.UserTitleText>유저 : {user?.nickName.replace('박우빈', '이채우')}</S.UserTitleText>
					</S.UserTitleWrap>
					<C.Classify>{user?.authority}</C.Classify>
					<S.UserLine />
					<S.UserInfoWrap>
						<C.AccodianMenu name="정보">
							<S.UserInfoLoadWrap>
								{userInfo.authority === 'ADMIN' ? <C.Authority email={user?.email || ''} /> : null}
								<span>
									이름은 {user?.nickName.replace('박우빈', '이채우')}이며, 부마위키의
									{user?.authority === 'ADMIN' ? ' 관리자' : user?.authority === 'BANNED' ? ' 읽기전용 사용자' : ' 사용자'} 중 한 명이다.
								</span>
							</S.UserInfoLoadWrap>
						</C.AccodianMenu>
						<C.AccodianMenu name="기여한 문서">
							<S.ContributeWrap>
								<span>이 유저가 기여한 문서의 정보들이다.</span>
								<S.ContributeList>
									{user?.contributeDocs.map((docs: Contributors, index) => (
										<span key={index}>
											문서명 :&nbsp;
											<S.ContributeLink to={`/docs/${docs.title}`}>{docs.title}</S.ContributeLink>
											<br />
											수정 날짜 : {FC.dateParser(docs.createTime)}
										</span>
									))}
								</S.ContributeList>
							</S.ContributeWrap>
						</C.AccodianMenu>
						<S.UserLine />
					</S.UserInfoWrap>
				</C.Board>
				<C.Aside />
			</S.UserWrap>
			<C.ScrollBtn />
			<C.Footer />
		</div>
	)
}

export default User
