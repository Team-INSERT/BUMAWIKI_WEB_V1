import * as C from 'allFiles'
import { UserContext } from 'App'
import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import autoComplete from 'util/autoComplete'
import { documentation } from 'util/documentation'
import { getCookie } from 'util/getCookie'
import * as S from './style'

const Docs = () => {
	const navigate = useNavigate()
	const user = React.useContext(UserContext)
	const [docsType, setDocsType] = React.useState('')
	const [enroll, setEnroll] = React.useState<number>()
	const [title, setTitle] = React.useState(decodeURI(window.location.search.replace('?name=', '')) || '')
	const [contents, setContents] = React.useState('')
	const [files, setFiles] = React.useState<any>()

	console.log(window.location.search)

	const onChangeRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setDocsType(e.target.id)
	}

	const onChangeEnrollRadio = (e: React.ChangeEvent<HTMLInputElement>) => {
		setEnroll(parseInt(e.target.id))
	}

	const onChangeTextArea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setContents(e.target.value)
		autoComplete(contents, e)
	}

	const onClickCreateDocs = async () => {
		if (!user.isLogin) {
			alert('로그인 후 이용 가능한 서비스입니다.')
			return
		}

		if (!enroll) {
			alert('연도를 선택해주세요!')
			return
		}

		if (title.length === 0) {
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

		try {
			const res = await axios.post('/docs/create', data, {
				headers: {
					'Content-Type': `multipart/form-data`,
					Authorization: getCookie('authorization'),
					refresh_token: getCookie('refresh_token'),
				},
			})
			alert('문서가 생성되었습니다!')
			navigate(`/docs/${res.data.id}`)
		} catch (err) {
			console.log(err)
			alert('오류가 발생했습니다.')
			return
		}
	}

	return (
		<div>
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
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="TEACHER" name="radio" />
								<label htmlFor="MAJOR_TEACHER">전공 선생님</label>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="MAJOR_TEACHER" name="radio" />
								<label htmlFor="MENTOR_TEACHER">멘토 선생님</label>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="MENTOR_TEACHER" name="radio" />
								<label htmlFor="ACCIDENT">사건/사고</label>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="ACCIDENT" name="radio" />
								<label htmlFor="CLUB">전공동아리</label>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="CLUB" name="radio" />
								<label htmlFor="FREE_CLUB">사설동아리</label>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeRadio(e)} id="FREE_CLUB" name="radio" />
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
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeEnrollRadio(e)} id="2023" name="radios" />
								<S.EnrollLabel htmlFor="2022">2022년</S.EnrollLabel>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeEnrollRadio(e)} id="2022" name="radios" />
								<S.EnrollLabel htmlFor="2021">2021년</S.EnrollLabel>
								<S.CreateTableRadio type="radio" onChange={(e) => onChangeEnrollRadio(e)} id="2021" name="radios" />
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
								{['', '', ''].map(() => (
									<input
										type="file"
										onChange={(e) => setFiles([e.target.files instanceof FileList ? e.target.files[0] : '', ...files])}
									/>
								))}
							</S.FileInputWrap>
						</S.CreateTableTRFile>
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>문서 내용</S.CreateTableTRTitle>
							<S.CreateTableTRTextarea onChange={(e) => onChangeTextArea(e)} value={contents} />
						</S.CreateTableTRTextContent>
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>미리보기</S.CreateTableTRTitle>
							<S.CreateTableTRDiv
								dangerouslySetInnerHTML={{
									__html: documentation(contents.replace(/<br>/gi, '\n')),
								}}></S.CreateTableTRDiv>
						</S.CreateTableTRTextContent>
					</S.CreateTable>
					<S.CreateSubmit>
						<S.CreateWarn>
							※ 필독! 문서 내 부적절한 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※
						</S.CreateWarn>
						<S.CreateButton onClick={onClickCreateDocs}>문서 생성</S.CreateButton>
					</S.CreateSubmit>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.CreateWrap>
			<C.Footer />
		</div>
	)
}

export default Docs
