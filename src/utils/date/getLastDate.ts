import moment from 'moment'

const getLastDate = (UTC: string) => {
	const date = new Date(UTC)
	const lastModifiedAt = [date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), date.getSeconds()]

	const toNow = moment(lastModifiedAt).toNow().replace('in ', '').replace('s', '').replace(' ago', '')

	if (toNow.includes('second')) return toNow.replace('a few seconds', '몇 초전')
	if (toNow.includes('minute')) return toNow.replace(' minute', '분 전').replace('a', '1')
	if (toNow.includes('hour')) return toNow.replace(' hour', '시간 전').replace('an', '1')
	if (toNow.includes('day')) return toNow.replace(' day', '일 전').replace('a', '1')
	if (toNow.includes('month')) return toNow.replace(' month', '달 전').replace('a', '1')
	if (toNow.includes('year')) return toNow.replace(' year', '일 전').replace('a', '1')

	return ''
}

export default getLastDate
