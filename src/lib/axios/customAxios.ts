import axios from 'axios'
import tokenExpired from 'lib/token/tokenExpired'

const bumawikiAxios = axios.create({
	baseURL: 'http://bumawiki.kro.kr/api',
	timeout: 100000,
})

bumawikiAxios.interceptors.request.use(
	(config) => {
		return config
	},
	(error) => {
		return Promise.reject(error)
	}
)

bumawikiAxios.interceptors.response.use(
	(response) => {
		return response
	},
	(error) => {
		const { status, message } = error.response.data
		if (status === 403 && message === 'User Not Login') {
			tokenExpired()
		}
		return Promise.reject(error)
	}
)
export { bumawikiAxios }
