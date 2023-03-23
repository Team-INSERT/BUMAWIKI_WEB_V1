import { getRefreshToken } from 'api/user'

const tokenExpired = async () => {
	const res = await getRefreshToken()
	localStorage.setItem('access_token', res.data.accessToken)
}

export default tokenExpired
