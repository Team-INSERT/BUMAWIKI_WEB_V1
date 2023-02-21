import * as R from 'react-router-dom'
import * as S from './style'
import * as api from 'api/editDocs'

import React from 'react'
import { useRecoilValue } from 'recoil'
import userState from 'context/userState'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'

interface DetailBtnProps {
	docsId: number
}

const DetailBtn = ({ docsId }: DetailBtnProps) => {
	const router = R.useParams()
	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()
	const [docsName, setDocsName] = React.useState('')
	const queryClient = useQueryClient()

	const updateDocsTitleMutation = useMutation(api.updateDocsTitle as MutationFunction, {
		onSuccess: () => {
			alert('문서 이름이 변경되었습니다!')
			queryClient.invalidateQueries('docs')
		},
		onError: (err) => {
			alert('오류가 발생했습니다.')
			console.log(err)
		},
	})

	const deleteDocsTitleMutation = useMutation(api.deleteDocs as MutationFunction, {
		onSuccess: () => {
			alert('문서가 삭제되었습니다!')
			navigate('/')
		},
		onError: (err) => {
			alert('오류가 발생했습니다.')
			console.log(err)
		},
	})

	const onClickChangeDocsName = async () => {
		if (!docsName.length) {
			alert('내용이 없습니다.')
			return
		}
		updateDocsTitleMutation.mutate({ title: router.title, docsName })
	}

	const onClickDeleteDocs = async () => {
		const result = window.confirm('정말 삭제하시겠습니까?')
		if (result) {
			deleteDocsTitleMutation.mutate(docsId)
		}
	}

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
							<S.DetailInput value={docsName} onChange={(e) => setDocsName(e.target.value)} />
							<S.DetailWrap onClick={onClickChangeDocsName}>
								<S.DetailButton>
									<S.DetailText>변경</S.DetailText>
								</S.DetailButton>
							</S.DetailWrap>
						</>
					) : (
						''
					)}
					<S.DetailLinkWrap to={`/update/${router.title}`}>
						<S.DetailButton>
							<S.DetailText>편집</S.DetailText>
						</S.DetailButton>
					</S.DetailLinkWrap>
					<S.DetailLinkWrap to={`/version/${router.title}`}>
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
