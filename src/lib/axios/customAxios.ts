import axios from 'axios'
import tokenExpired from 'lib/token/tokenExpired'

const bumawikiAxios = axios.create({
	baseURL: process.env.REACT_APP_BASE_URL,
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
		const { status, code, message } = error.response.data
		if (status === 403 && message === 'Forbidden' && code) {
			tokenExpired()
		}
		return Promise.reject(error)
	}
)
export { bumawikiAxios }
