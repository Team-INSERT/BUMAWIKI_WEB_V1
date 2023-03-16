import axios from 'axios'
import tokenExpired from 'lib/token/tokenExpired'

const bumawikiAxios = axios.create({
	baseURL: 'http://bumawiki.kro.kr/api',
	timeout: 10000,
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
		if (message) {
			if (status === 403) {
				tokenExpired()
			}
		}
		return Promise.reject(error)
	}
)
export { bumawikiAxios }
