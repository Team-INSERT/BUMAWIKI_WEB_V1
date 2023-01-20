import React, { useEffect, useState } from 'react'
import * as C from 'allFiles'
import * as S from './style'
import axios, { AxiosError } from 'axios'
import Docs from 'types/docs'

const Student = () => {
	const [students, setStudents] = useState([])
	const [allDate] = useState([2023])
	const nowDate = new Date()

	const getStudentDocs = async () => {
		try {
			const res = await axios.get(`/docs/student`)
			const data = res.data.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setStudents(data)
		} catch (err) {
			if (err instanceof AxiosError) {
				console.log(err)
				alert('오류가 발생하여 문서를 불러올 수 없습니다.')
			}
		}
	}

	useEffect(() => {
		for (let date = nowDate.getFullYear() - 1; date >= 2021; date--) {
			allDate.push(date)
		}
		getStudentDocs()
		// eslint-disable-next-line
	}, [])

	return (
		<>
			<C.Header />
			<S.StudentWrap>
				<C.Board>
					<S.StudentTitleWrap>
						<S.StudentTitleText>부마위키:사건/사고</S.StudentTitleText>
					</S.StudentTitleWrap>
					<S.StudentClassify>
						<C.Classify>사건/사고</C.Classify>
					</S.StudentClassify>
					<S.StudentLine />
					<S.StudentListWrap>
						{allDate.map((date) => (
							<C.AccodianMenu name={`${date}년 사건/사고`} key={date}>
								{students.map((student: Docs) => (
									<S.StudentList>
										{student.enroll === date ? (
											<S.StudentListItem>
												<S.StudentLink to={`/docs/${student.title}`}>{student.title}</S.StudentLink>
											</S.StudentListItem>
										) : (
											''
										)}
									</S.StudentList>
								))}
							</C.AccodianMenu>
						))}
					</S.StudentListWrap>
					<C.SubFooter />
				</C.Board>
				<C.ScrollBtn />
				<C.Aside />
			</S.StudentWrap>
			<C.Footer />
		</>
	)
}

export default Student
