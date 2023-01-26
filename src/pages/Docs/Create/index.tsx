import * as C from 'allFiles'
import * as S from './style'
import * as FC from 'utils/function'
import * as api from 'utils/api/editDocs'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userState from 'atom/userState'
import { useMutation } from 'react-query'

const Docs = () => {
	const navigate = useNavigate()
	const user = useRecoilValue(userState)

	const [title, setTitle] = React.useState(decodeURI(window.location.search.replace('?name=', '')) || '')
	const [docsType, setDocsType] = React.useState<string>('')
	const [contents, setContents] = React.useState<string>('')
	const [enroll, setEnroll] = React.useState<number>()
	const [files, setFiles] = React.useState<any>()

	const { mutate } = useMutation(api.createDocs, {
		onSuccess: (data) => {
			alert('문서가 생성되었습니다!')
			navigate(`/docs/${data.id}`)
		},
		onError: (err) => {
			alert('오류가 발생했습니다. 관리자에게 문의 바랍니다.')
			console.log(err)
		},
	})

	const onClickCreateDocs = async () => {
		if (!user.isLogin) {
			alert('로그인 후 이용 가능한 서비스입니다.')
			return
		}

		if (!enroll) {
			alert('연도를 선택해주세요!')
			return
		}

		if (!title.length) {
			alert('문서의 이름을 정해주세요!')
			return
		}

		if (!docsType) {
			alert('문서의 분류를 선택해주세요!')
			return
		}

		const FormData = require('form-data')
		const data = new FormData()
		data.append(
			'request',
			new Blob(
				[
					`{ "title": "${title.replace(/"/gi, '&$^%')}", "enroll":"${enroll}", "contents":"${contents
						.replace(/\n/gi, '<br>')
						.replace(/"/gi, '&$^%')
						.replace(/\\/gi, '\\\\')}", "docsType":"${docsType}"}`,
				],
				{ type: 'application/json' }
			)
		)
		for (let i = files.length - 1; i >= 0; i--) {
			data.append('files', files[i], files[i].name)
		}

		mutate({ data })
	}

	return (
		<>
			<C.Header />
			<S.CreateWrap>
				<C.Board>
					<S.CreateTitleWrap>
						<S.CreateTitleText>문서 생성</S.CreateTitleText>
					</S.CreateTitleWrap>
					<S.CreateTable>
						<S.CreateTableTR>
							<S.CreateTableTRTitle>분류</S.CreateTableTRTitle>
							<S.CreateTableTRContents>
								<label htmlFor="TEACHER">인문 선생님</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="TEACHER" name="radio" />
								<label htmlFor="MAJOR_TEACHER">전공 선생님</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="MAJOR_TEACHER" name="radio" />
								<label htmlFor="MENTOR_TEACHER">멘토 선생님</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="MENTOR_TEACHER" name="radio" />
								<label htmlFor="ACCIDENT">사건/사고</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="ACCIDENT" name="radio" />
								<label htmlFor="CLUB">전공동아리</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="CLUB" name="radio" />
								<label htmlFor="FREE_CLUB">사설동아리</label>
								<S.CreateTableRadio type="radio" onChange={(e) => setDocsType(e.target.id)} id="FREE_CLUB" name="radio" />
							</S.CreateTableTRContents>
						</S.CreateTableTR>
						<S.CreateTableTR>
							<S.CreateTableTRTitle>문서 이름</S.CreateTableTRTitle>
							<S.CreateTableTRInputContents onChange={(e) => setTitle(e.target.value)} value={title} />
						</S.CreateTableTR>
						<S.CreateTableTR>
							<S.CreateTableTRTitle>연도</S.CreateTableTRTitle>
							<S.CreateTableTRContents>
								<S.EnrollLabel htmlFor="2023">2023년</S.EnrollLabel>
								<S.CreateTableRadio type="radio" onChange={(e) => setEnroll(parseInt(e.target.id))} id="2023" name="radios" />
								<S.EnrollLabel htmlFor="2022">2022년</S.EnrollLabel>
								<S.CreateTableRadio type="radio" onChange={(e) => setEnroll(parseInt(e.target.id))} id="2022" name="radios" />
								<S.EnrollLabel htmlFor="2021">2021년</S.EnrollLabel>
								<S.CreateTableRadio type="radio" onChange={(e) => setEnroll(parseInt(e.target.id))} id="2021" name="radios" />
							</S.CreateTableTRContents>
						</S.CreateTableTR>
						<S.CreateTableTRExample>
							<S.CreateTableTRTitle>예시</S.CreateTableTRTitle>
							<S.CreateTableTRContents>
								<S.ExampleImage src="/images/docs-example.png" alt="문서 양식" />
							</S.CreateTableTRContents>
						</S.CreateTableTRExample>
						<S.CreateTableTRFile>
							<S.CreateTableTRTitle>이미지</S.CreateTableTRTitle>
							<S.FileInputWrap>
								{[null, null, null].map(() => (
									<input type="file" onChange={(e) => setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files])} />
								))}
							</S.FileInputWrap>
						</S.CreateTableTRFile>
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>문서 내용</S.CreateTableTRTitle>
							<S.CreateTableTRTextarea onChange={(e) => setContents(FC.autoComplete(contents, e))} value={contents} />
						</S.CreateTableTRTextContent>
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>미리보기</S.CreateTableTRTitle>
							<S.CreateTableTRDiv
								dangerouslySetInnerHTML={{
									__html: FC.documentation(contents.replace(/<br>/gi, '\n')),
								}}></S.CreateTableTRDiv>
						</S.CreateTableTRTextContent>
					</S.CreateTable>
					<S.CreateSubmit>
						<S.CreateWarn>※ 필독! 문서 내 부적절한 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</S.CreateWarn>
						<S.CreateButton onClick={onClickCreateDocs}>문서 생성</S.CreateButton>
					</S.CreateSubmit>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.CreateWrap>
			<C.Footer />
		</>
	)
}

export default Docs
