import moment from 'moment'

const dateParser = (UTC: string) => {
	const weeks = ['일', '월', '화', '수', '목', '금', '토']
	const date = moment(UTC)

	const PARSING_DATE = `
    ${date.year()}년 
    ${date.month() + 1}월 
    ${date.date()}일
	${weeks[date.day()]}요일
    ${date.format('A') === 'PM' ? '오후' : '오전'}
	${date.format('A') === 'PM' ? date.hour() - 12 : date.hour()}시 
    ${date.minute()}분`

	return PARSING_DATE
}

export default dateParser
