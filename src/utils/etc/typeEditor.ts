const typeEditor = (classify: string) => {
	if (classify === 'STUDENT') {
		return '학생'
	} else if (classify === 'ACCIDENT') {
		return '사건/사고'
	} else if (classify === 'CLUB') {
		return '전공 동아리'
	} else if (classify === 'TEACHER') {
		return '인문교과 선생님'
	} else if (classify === 'MAJOR_TEACHER') {
		return '전문교과 선생님'
	} else if (classify === 'MENTOR_TEACHER') {
		return '멘토 선생님'
	} else if (classify === 'FREE_CLUB') {
		return '사설 동아리'
	} else if (classify === 'ADMIN') {
		return '관리자'
	} else if (classify === 'BANNED') {
		return '읽기전용 사용자'
	} else if (classify === 'USER') {
		return '사용자'
	} else if (classify === 'NOTICE') {
		return '공지사항'
	}
	return classify
}

export default typeEditor
