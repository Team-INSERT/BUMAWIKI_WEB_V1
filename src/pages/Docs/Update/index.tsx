import * as C from 'allFiles'
import * as R from 'react-router-dom'
import * as FC from 'util/function/'
import * as S from './style'

import axios from 'axios'
import React from 'react'
import { useRecoilValue } from 'recoil'
import userState from 'atom/userState'

interface reducerAction {
	name: string
	value: string
}

function reducer(state: any, action: reducerAction) {
	return {
		...state,
		[action.name]: action.value,
	}
}

const Docs = () => {
	const router = R.useParams()
	const user = useRecoilValue(userState)
	const navigate = R.useNavigate()

	const [title, setTitle] = React.useState('')
	const [contents, setContents] = React.useState('')
	const [files, setFiles] = React.useState<any>([])
	const [fileInput, setFileInput] = React.useState([''])
	const [table, setTable] = React.useState('')

	const [state, dispatch] = React.useReducer(reducer, {
		Color: '',
		TextColor: '',
		Line: '',
		Name: '',
		Height: '',
		Birth: '',
		Country: '',
		MBTI: '',
		Club: '',
		Field: '',
	})

	const { Color, Country, TextColor, Line, Name, Height, Birth, MBTI, Club, Field } = state

	const onChangeTable = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch(e.target)
	}

	React.useEffect(() => {
		setTable(FC.makeTable(Line, TextColor, Color, Name, Height, Birth, Country, MBTI, Club, Field))
	}, [table, TextColor, Color, Name, Height, Birth, Country, MBTI, Club, Field, Line])

	const onClickUpdateDocs = async () => {
		if (!user.isLogin) {
			alert('로그인 후 이용 가능한 서비스입니다.')
			return
		}
		const FormData = require('form-data')
		const data = new FormData()
		data.append(
			'request',
			new Blob([`{ "contents": "${contents.replace('[[프로필]]', table).replace(/\n/gi, '<br>').replace(/"/gi, '&$^%').replace(/\\/gi, '/')}" }`], {
				type: 'application/json',
			}),
			{ contentType: 'application/json' }
		)
		for (let i = files.length - 1; i >= 0; i--) {
			data.append('files', files[i], files[i].name)
		}
		if (contents.length === 0) {
			alert('문서가 비어있습니다!')
			return
		}
		try {
			await axios.put(`docs/update/${router.title}`, data, {
				headers: {
					'Content-Type': `multipart/form-data`,
					Authorization: FC.getCookie('authorization'),
				},
			})
			alert('문서가 편집되었습니다!')
			navigate(`/docs/${router.title}`)
		} catch (err) {
			console.log(err)
			if (err instanceof axios.AxiosError && err.response !== undefined) {
				if (err.response.status === 403) {
					if (err.response.data.message === 'Cannot Change Your Docs') {
						alert('자기자신의 문서는 변경할 수 없습니다.')
					} else if (err.response.data.error === 'Forbidden') {
						alert('읽기전용 유저입니다.')
					} else {
						alert('로그인 후 사용 가능한 서비스입니다.')
					}
				} else {
					alert(`오류가 발생했습니다. 개별적으로 관리자에게 문의바랍니다. 오류코드 : ${err.response.status}`)
				}
			}
		}
	}

	const getDocsInfo = async () => {
		try {
			const res = await axios.get(`/docs/find/title/${router.title}`)
			setContents(res.data.contents)
			setTitle(res.data.title)
		} catch (err) {
			if (err instanceof axios.AxiosError) {
				console.log(err)
				alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			}
		}
	}

	React.useEffect(() => {
		getDocsInfo()
		// eslint-disable-next-line
	}, [router.title])
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
						{fileInput.map(() => (
							<input type="file" onChange={(e) => setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files])} />
						))}
						<S.FileAddWrap onClick={() => setFileInput([...fileInput, ''])}>
							<S.FileAddButton>+</S.FileAddButton>
							<S.FileAddText>사진 더 선택하기</S.FileAddText>
						</S.FileAddWrap>
						<S.DocsNeedFileText>문서에 필요한 사진태그 개수 : {files.length}개</S.DocsNeedFileText>
						<br />
						<S.CreateProfileText>프로필 생성기</S.CreateProfileText>
						<S.CreateProfileWrap>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>표 색상</S.CreateProfileTableTitle>
								<input placeholder="ex) #251678, orange" onChange={onChangeTable} name="Color" value={Color} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>글자 색상</S.CreateProfileTableTitle>
								<input placeholder="ex) black, white" onChange={onChangeTable} name="TextColor" value={TextColor} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>선 색상</S.CreateProfileTableTitle>
								<input placeholder="ex) black, white" onChange={onChangeTable} name="Line" value={Line} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>사진</S.CreateProfileTableTitle>
								<S.CreateProfileTableFile>
									<input type="file" onChange={(e) => setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files])} />
								</S.CreateProfileTableFile>
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>이름</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="Name" value={Name} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>키</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="Height" value={Height} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>생일</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="Birth" value={Birth} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>국적</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="Country" value={Country} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>MBTI</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="MBTI" value={MBTI} />
							</S.CreateProfileTable>
							<S.CreateProfileTable>
								<S.CreateProfileTableTitle>소속</S.CreateProfileTableTitle>
								<input onChange={onChangeTable} name="Club" value={Club} />
							</S.CreateProfileTable>
							<S.CreateProfileTableLast>
								<S.CreateProfileTableTitleLast>분야</S.CreateProfileTableTitleLast>
								<input onChange={onChangeTable} name="Field" value={Field} />
							</S.CreateProfileTableLast>
							<S.CreateProfileInputWarn>※ 내용 안에 [[프로필]] 태그를 삽입해주세요! ※</S.CreateProfileInputWarn>
							<br />
							<S.CreateProfileInputWarn>※ 프로필을 변경하시려면 [[프로필]] 태그를 삭제했다가 재입력해주셔야해요! ※</S.CreateProfileInputWarn>
						</S.CreateProfileWrap>
						<S.UpdateTextarea onChange={(e) => setContents(FC.autoComplete(contents, e))} value={contents.replace(/\?\^table.*/gi, '[[프로필]]')} />
						<S.UpdatePreviewText>미리보기</S.UpdatePreviewText>
						<S.UpdatePreview
							dangerouslySetInnerHTML={{
								__html: FC.documentation(contents.replace(/<br>/gi, '\n').replace('[[프로필]]', table)),
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

export default Docs
