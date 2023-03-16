import { getRefreshToken } from 'api/user'

const tokenExpired = async () => {
	const res = await getRefreshToken()
	document.cookie = `authorization=${res.data.accessToken};`
}

export default tokenExpired
