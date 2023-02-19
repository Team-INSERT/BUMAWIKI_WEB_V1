import * as C from 'allFiles'
import * as S from './style'

import axios from 'axios'
import React from 'react'
import { Link } from 'react-router-dom'
import Docs from 'types/docs'

const Teacher = () => {
	const [major, setMajor] = React.useState([])
	const [humanities, setHumanities] = React.useState([])
	const [mentor, setMentor] = React.useState([])

	const getTeacherDocs = async (router: string) => {
		try {
			const res = await axios.get(`/docs/${router}`)
			const data = res.data.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))

			if (router === 'teacher') {
				setHumanities(data)
				getTeacherDocs('majorTeacher')
			} else if (router === 'majorTeacher') {
				setMajor(data)
				getTeacherDocs('mentorTeacher')
			} else if (router === 'mentorTeacher') {
				setMentor(data)
			}
		} catch (err) {
			return
		}
	}

	React.useEffect(() => {
		getTeacherDocs('teacher')
		getTeacherDocs('majorTeacher')
		getTeacherDocs('mentorTeacher')
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<C.Header />
			<S.TeacherWrap>
				<C.Board>
					<S.TeacherTitleWrap>
						<S.TeacherTitleText>부마위키:선생님</S.TeacherTitleText>
					</S.TeacherTitleWrap>
					<S.Classify>
						<C.Classify>선생님</C.Classify>
					</S.Classify>
					<S.TeacherLine />
					<S.TeacherWarnText>※ 필독! 문서 내 대상을 비하하는 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</S.TeacherWarnText>
					<S.TeacherList>
						<C.AccodianMenu name={`인문과목 선생님`}>
							<S.TeacherDetailList>
								{humanities.map((teacher: Docs, index) => (
									<S.TeacherListItem key={index}>
										<S.TeacherLink to={`/docs/${teacher.title}`}>{teacher.title}</S.TeacherLink>
									</S.TeacherListItem>
								))}
							</S.TeacherDetailList>
						</C.AccodianMenu>
						<C.AccodianMenu name={`전공과목 선생님`}>
							<S.TeacherDetailList>
								{major.map((teacher: Docs, index) => (
									<S.TeacherListItem key={index}>
										<S.TeacherLink to={`/docs/${teacher.title}`} className="link">
											{teacher.title}
										</S.TeacherLink>
									</S.TeacherListItem>
								))}
							</S.TeacherDetailList>
						</C.AccodianMenu>
						<C.AccodianMenu name={`멘토 선생님`}>
							<ul className="teacher-list">
								{mentor.map((teacher: Docs) => (
									<div key={teacher.id}>
										<li>
											<Link to={`/docs/${teacher.title}`} className="link">
												{teacher.title}
											</Link>
										</li>
									</div>
								))}
							</ul>
						</C.AccodianMenu>
					</S.TeacherList>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.TeacherWrap>
			<C.Footer />
		</>
	)
}

export default Teacher
