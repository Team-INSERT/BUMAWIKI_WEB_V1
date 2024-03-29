import * as C from 'allFiles'
import * as api from 'api/getDocs'
import * as S from './style'
import * as FC from 'utils'

import React from 'react'
import { useQuery } from 'react-query'
import Docs from 'types/docs.type'
import { Helmet } from 'react-helmet-async'

const Student = () => {
	const [students, setStudents] = React.useState([])
	const years = FC.getAllYear()

	useQuery('getStudent', () => api.getBaseDocs('student'), {
		onSuccess: (res) => {
			const data = res.sort((a: Docs, b: Docs) => (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1))
			setStudents(data)
		},
	})

	return (
		<>
			<Helmet>
				<title>부마위키 - 학생</title>
			</Helmet>
			<C.Header />
			<S.StudentWrap>
				<C.Board>
					<S.StudentTitleWrap>
						<S.StudentTitleText>부마위키:학생</S.StudentTitleText>
					</S.StudentTitleWrap>
					<S.StudentClassify>
						<C.Classify>학생</C.Classify>
					</S.StudentClassify>
					<S.StudentLine />
					<S.StudentListWrap>
						{years.map((year) => (
							<C.AccodianMenu name={`${year}년도 입학생`} key={year} isOpen={true}>
								{students.map((student: Docs, index) => (
									<S.StudentList key={index}>
										{student.enroll === year ? (
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
