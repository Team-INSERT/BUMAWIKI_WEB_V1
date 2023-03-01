const getLastDate = (date: string) => {
	const nowDate = new Date()
	const lastDate =
		Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000) >= 60
			? Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60) >= 60
				? Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60 / 60) >= 24
					? Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60 / 60 / 24) >= 31
						? `${Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60 / 60)}달 전`
						: `${Math.trunc(Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60 / 60) / 24)}일 전`
					: `${Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60 / 60)}시간 전`
				: `${Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000 / 60)}분 전`
			: `${Math.trunc((nowDate.getTime() - Date.parse(date)) / 1000)}초 전`
	return lastDate
}

export default getLastDate
