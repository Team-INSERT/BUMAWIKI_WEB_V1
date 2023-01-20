import * as C from 'allFiles'
import React from 'react'
import { dateParser } from 'util/dateParser'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import Contributors from 'types/contributors'
import * as S from './style'

const MyPage = () => {
	const [user, setUser] = React.useState({
		id: 0,
		nickName: '알 수 없음',
		authority: '',
		contributeDocs: [],
	})
	const router = useParams()

	const getUserInfo = async () => {
		try {
			const res = await axios.get(`/user/id/${router.id}`)
			setUser({ ...res.data, contributeDocs: res.data.contributeDocs.reverse() })
		} catch (err) {
			alert('유저 정보를 불러오는 도중 오류가 발생했습니다.')
			console.log(err)
			return
		}
	}

	React.useLayoutEffect(() => {
		getUserInfo()
		// eslint-disable-next-line
	}, [router.id])

	return (
		<div>
			<C.Header />
			<S.UserWrap>
				<C.Board>
					<S.UserTitleWrap>
						<S.UserTitleText>유저 : {user.nickName}</S.UserTitleText>
					</S.UserTitleWrap>
					<C.Classify>{user.authority}</C.Classify>
					<S.UserLine />
					<S.UserInfoWrap>
						<C.AccodianMenu name={'정보'}>
							<S.UserInfoLoadWrap>
								<span>
									이름은 {user.nickName}이며, 부마위키의{' '}
									{user.authority === 'ADMIN' ? '관리자' : user.authority === 'BANNED' ? '읽기전용 사용자' : '사용자'}{' '}
									중 한 명이다.
								</span>
							</S.UserInfoLoadWrap>
						</C.AccodianMenu>
						<C.AccodianMenu name={'기여한 문서'}>
							<S.ContributeWrap>
								<span>이 유저가 기여한 문서의 정보들이다.</span>
								<S.ContributeList>
									{user.contributeDocs.map((docs: Contributors, index) => (
										<span key={index}>
											문서명 :{' '}
											<S.ContributeLink to={`/docs/${docs.docsId}`}>
												{docs.title}[{docs.docsId}]
											</S.ContributeLink>
											<br />
											수정 날짜 : {dateParser(docs.createTime)}
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

export default MyPage
