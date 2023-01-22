import * as R from 'react-router-dom'
import * as FC from 'util/'
import * as S from './style'

import React from 'react'
import axios from 'axios'
import { UserContext } from 'App'
import Docs from 'types/docs'

const DetailBtn = () => {
	const router = R.useParams()
	const user = React.useContext(UserContext)
	const navigate = R.useNavigate()

	const [docs, setDocs] = React.useState<Docs>()
	const [docsName, setDocsName] = React.useState('')

	const getDocsInfo = async () => {
		try {
			const res = await axios.get(`/docs/find/id/${router.title}`)
			setDocs({
				...res.data,
				lastModifiedAt: FC.dateParser(res.data.lastModifiedAt),
			})
		} catch (err) {
			if (err instanceof axios.AxiosError) {
				alert('오류가 발생하여 문서를 불러올 수 없습니다.')
				console.log(err)
				return
			}
		}
	}

	const onClickChangeDocsName = async () => {
		if (docsName.length === 0) {
			alert('내용이 없습니다.')
			return
		}

		try {
			const res = await axios.put(
				`/docs/update/title/${router.title}`,
				{ title: docsName },
				{
					headers: {
						Authorization: FC.getCookie('authorization'),
					},
				}
			)
			alert('문서 수정 완료')
			navigate(`/docs/${res.data.title}`)
		} catch (err) {
			alert('문서 이름 변경 도중 오류가 발생했습니다.')
			console.log(err)
		}
	}

	const onClickDeleteDocs = async () => {
		try {
			axios.delete(`/docs/delete/${router.title}`, {
				headers: {
					Autsorization: FC.getCookie('authorization'),
				},
			})
			alert('문서가 삭제되었습니다!')
			navigate('/')
		} catch (err) {
			alert('문서 삭제 도중 오류가 발생했습니다.')
			console.log(err)
		}
	}

	React.useEffect(() => {
		getDocsInfo()
		// eslint-disable-next-line
	}, [router])

	return (
		<>
			{user.isLogin ? (
				<S.DetailButtonWrap>
					{user.authority === 'ADMIN' ? (
						<>
							<S.DetailWrap onClick={onClickDeleteDocs}>
								<S.DetailButton>
									<S.DetailText>삭제</S.DetailText>
								</S.DetailButton>
							</S.DetailWrap>
							<S.DetailInput
								value={docsName}
								onChange={(e) => {
									setDocsName(e.target.value)
								}}
								required={true}
							/>
							<S.DetailWrap onClick={onClickChangeDocsName}>
								<S.DetailButton>
									<S.DetailText>변경</S.DetailText>
								</S.DetailButton>
							</S.DetailWrap>
						</>
					) : (
						''
					)}
					<S.DetailLinkWrap to={`/update/${docs?.title}`}>
						<S.DetailButton>
							<S.DetailText>편집</S.DetailText>
						</S.DetailButton>
					</S.DetailLinkWrap>
					<S.DetailLinkWrap to={`/version/${docs?.title}`}>
						<S.DetailButton>
							<S.DetailText>기록</S.DetailText>
						</S.DetailButton>
					</S.DetailLinkWrap>
				</S.DetailButtonWrap>
			) : (
				''
			)}
		</>
	)
}

export default DetailBtn
