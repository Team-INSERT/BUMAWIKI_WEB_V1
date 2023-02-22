import * as C from 'allFiles'
import * as R from 'react-router-dom'
import * as FC from 'utils'
import * as S from './style'
import * as getApi from 'api/getDocs'
import * as editApi from 'api/editDocs'

import userState from 'context/userState'
import React from 'react'
import { useRecoilValue } from 'recoil'
import { MutationFunction, useMutation, useQuery } from 'react-query'
import axios from 'axios'
import FileListArray from 'types/filelistArray'

const Update = () => {
	const router = R.useParams()
	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()

	const [title, setTitle] = React.useState('')
	const [contents, setContents] = React.useState('')
	const [files, setFiles] = React.useState<FileListArray[]>([])
	const [fileInput, setFileInput] = React.useState([''])

	const { mutate } = useMutation(editApi.updateDocs as MutationFunction, {
		onSuccess: () => {
			alert('문서가 편집되었습니다!')
			navigate(`/docs/${router.title}`)
		},
		onError: (err) => {
			console.log(err)
			if (err instanceof axios.AxiosError && err.response !== undefined) {
				if (err.response.status === 403) {
					if (err.response.data.message === 'Cannot Change Your Docs') alert('자기자신의 문서는 변경할 수 없습니다.')
					if (err.response.data.error === 'Forbidden') alert('읽기전용 유저입니다.')
					else alert('로그인 후 사용 가능한 서비스입니다.')
				} else {
					alert(`오류가 발생했습니다. 개별적으로 관리자에게 문의바랍니다. 오류코드 : ${err.response.status}`)
				}
			}
		},
	})

	const uploadFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) setFiles([...files, e.target.files[0]])
	}

	const onClickUpdateDocs = async () => {
		if (!user.isLogin) {
			alert('로그인 후 이용 가능한 서비스입니다.')
			return
		}

		if (!contents.length) {
			alert('문서가 비어있습니다!')
			return
		}

		const FormData = require('form-data')
		const data = new FormData()
		data.append(
			'request',
			new Blob([`{ "contents": "${contents.replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/')}" }`], {
				type: 'application/json',
			}),
			{ contentType: 'application/json' }
		)
		for (let i = files.length - 1; i >= 0; i--) {
			data.append('files', files[i], files[i].name)
		}

		mutate({ data, title: router.title })
	}

	useQuery('docs', () => getApi.getDocs(router.title as string), {
		onSuccess: (data) => {
			setContents(data.contents)
			setTitle(data.title)
		},
		onError: (err) => {
			alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			console.log(err)
		},
	})

	return (
		<>
			<C.Header />
			<S.DocsWrap>
				<C.Board>
					<S.DocsTitleWrap>
						<S.DocsTitleText>문서 편집 : {title}</S.DocsTitleText>
					</S.DocsTitleWrap>
					<S.DocsExampleImage src="/images/docs-example.png" alt="문서작성법" />
					<S.DocsLine />
					<S.DocsContentsWrap>
						{fileInput.map((index) => (
							<input key={index} type="file" accept="image/*" onChange={(e) => uploadFiles(e)} />
						))}
						<S.FileAddWrap onClick={() => setFileInput([...fileInput, ''])}>
							<S.FileAddButton>+</S.FileAddButton>
							<S.FileAddText>사진 더 선택하기</S.FileAddText>
						</S.FileAddWrap>
						<S.DocsNeedFileText>문서에 필요한 사진태그 개수 : {files.length}개</S.DocsNeedFileText>
						<S.UpdateTextarea
							onKeyDown={(e) => FC.onKeyDownUseTab(e)}
							onChange={(e) => setContents(FC.autoClosingTag(e))}
							value={contents.replace(/\?\^table.*/gi, '[[프로필]]').replace(/<br>/gi, '\n')}
						/>
						<S.UpdatePreviewText>미리보기</S.UpdatePreviewText>
						<S.UpdatePreview
							dangerouslySetInnerHTML={{
								__html: FC.documentation(contents.replace(/<br>/gi, '\n')),
							}}
						/>
						<S.UpdateButton onClick={onClickUpdateDocs}>문서 업데이트</S.UpdateButton>
					</S.DocsContentsWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.DocsWrap>
			<C.Footer />
		</>
	)
}

export default Update
