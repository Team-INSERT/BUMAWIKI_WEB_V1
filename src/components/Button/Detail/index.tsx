import * as R from 'react-router-dom'
import * as S from './style'
import * as api from 'api/editDocs'

import React from 'react'
import { userState } from 'context/userState'
import { MutationFunction, useMutation, useQueryClient } from 'react-query'
import { useRecoilValue } from 'recoil'

interface DetailBtnProps {
	docsId: number
}

const DetailBtn = ({ docsId }: DetailBtnProps) => {
	const router = R.useParams()
	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()
	const [docsName, setDocsName] = React.useState('')
	const [docsType, setDocsType] = React.useState('')
	const queryClient = useQueryClient()

	const updateDocsTitleMutation = useMutation(api.updateDocsTitle, {
		onSuccess: (res) => {
			alert('문서 이름이 변경되었습니다!')
			queryClient.invalidateQueries('lastModifiedDocs')
			navigate(`/docs/${res.data.title}`)
		},
	})

	const updateDocsTypeMutation = useMutation(api.updateDocsType, {
		onSuccess: (res) => {
			alert('문서 이름이 변경되었습니다!')
			queryClient.invalidateQueries('lastModifiedDocs')
			navigate(`/docs/${res.data.title}`)
		},
	})

	const onClickNavigatePage = (type: string) => {
		if (type === 'VERSION') navigate(`/version/${router.title}`)
		else if (type === 'UPDATE' && !user.id) alert('로그인 후 편집하실 수 있습니다!')
		else navigate(`/update/${router.title}`)
	}

	const deleteDocsTitleMutation = useMutation(api.deleteDocs as MutationFunction, {
		onSuccess: () => {
			alert('문서가 삭제되었습니다!')
			navigate('/')
		},
	})

	const onClickChangeDocsName = async () => {
		if (!docsName.length) {
			alert('내용이 없습니다.')
			return
		}
		updateDocsTitleMutation.mutate({ title: router.title as string, docsName })
	}

	const onClickChangeDocsType = async () => {
		if (!docsType.length) {
			alert('내용이 없습니다.')
			return
		}
		updateDocsTypeMutation.mutate({ title: router.title as string, docsType })
	}

	const onClickDeleteDocs = async () => {
		const result = window.confirm('정말 삭제하시겠습니까?')
		if (result) deleteDocsTitleMutation.mutate(docsId)
	}

	return (
		<S.DetailButtonWrap>
			{user.authority === 'ADMIN' ? (
				<>
					<S.DetailInput value={docsType} onChange={(e) => setDocsType(e.target.value)} />
					<S.DetailWrap onClick={onClickChangeDocsType}>
						<S.DetailButton>
							<S.DetailText>타입변경</S.DetailText>
						</S.DetailButton>
					</S.DetailWrap>
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
			<S.DetailLinkWrap onClick={() => onClickNavigatePage('UPDATE')}>
				<S.DetailButton>
					<S.DetailText>편집</S.DetailText>
				</S.DetailButton>
			</S.DetailLinkWrap>
			<S.DetailLinkWrap onClick={() => onClickNavigatePage('VERSION')}>
				<S.DetailButton>
					<S.DetailText>기록</S.DetailText>
				</S.DetailButton>
			</S.DetailLinkWrap>
		</S.DetailButtonWrap>
	)
}

export default DetailBtn
