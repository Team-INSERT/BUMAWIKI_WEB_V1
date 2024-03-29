import * as C from 'allFiles'
import * as api from 'api/editDocs'
import * as FC from 'utils'
import * as S from './style'

import { userState } from 'context/userState'
import React from 'react'
import { useMutation } from 'react-query'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import CreateDocsType from 'types/create.type'
import { encodeContents } from 'utils/document/requestContents'
import Frame from 'types/frame.type'
import sizeInitState from 'state/sizeInitState'
import createInitState from 'state/createInitState'
import { AxiosError } from 'axios'
import { Helmet } from 'react-helmet-async'

const docsTypeRadio = [
	{
		title: '보통교과 선생님',
		type: 'TEACHER',
	},
	{
		title: '전문교과 선생님',
		type: 'MAJOR_TEACHER',
	},
	{
		title: '멘토 선생님',
		type: 'MENTOR_TEACHER',
	},
	{
		title: '사건/사고',
		type: 'ACCIDENT',
	},
	{
		title: '전공동아리',
		type: 'CLUB',
	},
	{
		title: '사설동아리',
		type: 'FREE_CLUB',
	},
	{
		title: '틀',
		type: 'FRAME',
	},
]

const Create = () => {
	const navigate = useNavigate()
	const user = useRecoilValue(userState)
	const years = FC.getAllYear()

	const [size, setSize] = React.useState<Frame>(sizeInitState)
	const [docs, setDocs] = React.useState<CreateDocsType>(createInitState)

	const { mutate } = useMutation(api.createDocs, {
		onSuccess: (data) => {
			alert('문서가 생성되었습니다!')
			navigate(`/docs/${data.title}`)
		},
		onError: (err) => {
			if (err instanceof AxiosError) {
				const { status, message } = err?.response?.data
				if (status === 403) {
					if (message === 'Post_Already_Exist') return alert('이미 같은 이름의 문서가 존재합니다.')
					if (message === 'Forbidden') return alert('권한이 없습니다. 로그인이 되어있는지 확인하거나, 수정 권한이 있는지 확인해주세요.')
				}
			}
		},
	})

	const createDocs = () => {
		const FormData = require('form-data')
		const data = new FormData()
		data.append(
			'request',
			new Blob(
				[`{ "title": "${docs.title}", "enroll":"${docs.enroll}", "contents":"${encodeContents(docs.contents)}", "docsType":"${docs.docsType}"}`],
				{
					type: 'application/json',
				}
			)
		)
		docs.files.reverse().forEach((file) => data.append('files', file, file.name))
		mutate(data)
	}

	const onClickCreateDocs = () => {
		if (docs.title.includes('?') || docs.title.includes('/') || docs.title.includes('"') || docs.title.includes('\\'))
			return alert('문서명에는 물음표나 쌍따옴표, 슬래시나 역슬래시를 넣을 수 없습니다.')
		if (!user.id) return alert('로그인 후 이용 가능한 서비스입니다.')
		if (docs.enroll < 2021 && docs.docsType !== 'FRAME') return alert('연도를 선택해주세요!')
		if (!docs.title.length) return alert('문서의 이름을 정해주세요!')
		if (!docs.docsType) return alert('문서의 분류를 선택해주세요!')

		createDocs()
	}

	const makeFrame = () => {
		const frame = `<틀>\n<틀제목>제목삽입</틀제목>\n` + `<행>${'<열>내용삽입</열>'.repeat(size.row)}</행>\n`.repeat(size.column) + `</틀>`
		if (!docs.contents) return setDocs({ ...docs, contents: frame })
		return setDocs({ ...docs, contents: `${docs.contents}\n${frame}` })
	}

	const changeDocsType = (e: React.ChangeEvent<HTMLInputElement>) => {
		const type = e.target.id
		if (type === 'FRAME') {
			setDocs({ ...docs, docsType: type, title: `틀:${docs.title}` })
		} else {
			setDocs({ ...docs, docsType: type, title: docs.title.replace('틀:', '') })
		}
	}

	return (
		<>
			<Helmet>
				<title>부마위키 - 문서 생성</title>
			</Helmet>
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
								{user.authority === 'ADMIN' ? (
									<>
										<S.CreateTableRadioLabel htmlFor="STUDENT">학생</S.CreateTableRadioLabel>
										<S.CreateTableRadio type="radio" onChange={(e) => setDocs({ ...docs, docsType: e.target.id })} id="STUDENT" name="radio" />
										<S.CreateTableRadioLabel htmlFor="READONLY">관리자 전용</S.CreateTableRadioLabel>
										<S.CreateTableRadio type="radio" onChange={(e) => setDocs({ ...docs, docsType: e.target.id })} id="READONLY" name="radio" />
									</>
								) : null}
								{docsTypeRadio.map((value, index) => (
									<div key={index}>
										<S.CreateTableRadioLabel htmlFor={value.type}>{value.title}</S.CreateTableRadioLabel>
										<S.CreateTableRadio type="radio" onChange={(e) => changeDocsType(e)} id={value.type} name="radio" />
									</div>
								))}
							</S.CreateTableTRContents>
						</S.CreateTableTR>
						<S.CreateTableTR>
							<S.CreateTableTRTitle>문서 이름</S.CreateTableTRTitle>
							<S.CreateTableTRInputContents onChange={(e) => setDocs({ ...docs, title: e.target.value })} value={docs.title} />
						</S.CreateTableTR>
						{docs.docsType !== 'FRAME' ? (
							<S.CreateTableTR>
								<S.CreateTableTRTitle>연도</S.CreateTableTRTitle>
								<S.CreateTableTRContents>
									{years.map((year, index) => (
										<div key={index}>
											<S.EnrollLabel htmlFor={`${year}`}>{year}년</S.EnrollLabel>
											<S.CreateTableRadio
												type="radio"
												onChange={(e) => setDocs({ ...docs, enroll: parseInt(e.target.id) })}
												id={`${year}`}
												name="radios"
											/>
										</div>
									))}
								</S.CreateTableTRContents>
							</S.CreateTableTR>
						) : null}
						<S.CreateTableTRExample>
							<S.CreateTableTRTitle>예시</S.CreateTableTRTitle>
							<S.CreateTableTRContents>
								<S.ExampleImage src="/images/example.png" alt="문서 양식" />
							</S.CreateTableTRContents>
						</S.CreateTableTRExample>
						<S.CreateTableTRFile>
							<S.CreateTableTRTitle>이미지</S.CreateTableTRTitle>
							<S.FileInputWrap>
								{[1, 2, 3].map((key) => (
									<input
										key={key}
										type="file"
										accept="image/*"
										onChange={(e) => {
											if (e.target.files) setDocs({ ...docs, files: [...docs.files, e.target.files[0]] })
										}}
									/>
								))}
							</S.FileInputWrap>
						</S.CreateTableTRFile>
						{docs.docsType === 'FRAME' ? (
							<S.CreateTableTRFrame>
								<S.CreateTableTRTitle>틀 규격</S.CreateTableTRTitle>
								<S.FrameInputDiv>
									<S.FrameInputBox>
										<S.FrameInputWrap>
											<S.FrameInputContainer>
												<S.FrameText>열</S.FrameText>
												<S.FrameInput
													type="number"
													min="2"
													max="5"
													value={size.column}
													onChange={(e) => setSize({ ...size, column: parseInt(e.target.value) })}
												/>
											</S.FrameInputContainer>
											<S.FrameInputContainer>
												<S.FrameText>행</S.FrameText>
												<S.FrameInput
													type="number"
													min="2"
													max="10"
													value={size.row}
													onChange={(e) => setSize({ ...size, row: parseInt(e.target.value) })}
												/>
											</S.FrameInputContainer>
										</S.FrameInputWrap>
									</S.FrameInputBox>
									<S.CreateFrameButton onClick={() => makeFrame()}>틀생성</S.CreateFrameButton>
								</S.FrameInputDiv>
							</S.CreateTableTRFrame>
						) : (
							''
						)}
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>문서 내용</S.CreateTableTRTitle>
							<S.CreateTableTRTextarea
								onKeyDown={(e) => FC.onKeyDownUseTab(e)}
								onChange={(e) => setDocs({ ...docs, contents: FC.autoClosingTag(e) })}
								value={docs.contents}
							/>
						</S.CreateTableTRTextContent>
						<S.CreateTableTRTextContent>
							<S.CreateTableTRTitle>미리보기</S.CreateTableTRTitle>
							<S.CreateTableTRDiv
								dangerouslySetInnerHTML={{
									__html: FC.documentation(docs.contents),
								}}></S.CreateTableTRDiv>
						</S.CreateTableTRTextContent>
					</S.CreateTable>
					<S.CreateSubmit>
						<S.CreateWarn>※ 타인에 대한 조롱 또는 비방, 비난으로 인해 발생하는 문제에 대한 책임은 본인에게 있습니다. 주의해주세요! ※</S.CreateWarn>
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

export default Create
