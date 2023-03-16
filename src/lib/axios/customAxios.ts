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
		console.log(status, message)
		if (status === 403) {
			if (message === 'Access Token Expired') {
				localStorage.removeItem('access_token')
				return tokenExpired()
			}
			if (message === 'User Not Login' && localStorage.getItem('refresh_token')) {
				localStorage.removeItem('access_token')
				return tokenExpired()
			}
			if (message === 'Forbidden') {
				return alert('로그인 후 이용 가능한 서비스입니다.')
			}
			if (message === 'Refresh Token Expired') {
				localStorage.removeItem('refresh_token')
				localStorage.removeItem('access_token')
				return
			}
			if (message === 'No Post You Want To Update') {
				return alert('업데이트하려는 문서가 존재하지 않습니다.')
			}
			if (message === 'Post_Already_Exist') {
				return alert('해당 이름을 가진 문서가 이미 존재합니다.')
			}
			if (message === 'Cannot Change Your Docs') {
				return alert('자기자신의 문서는 변경할 수 없습니다.')
			}
		}
		if (status === 404) {
			if (message === 'User Not Found') {
				return alert('존재하지 않는 사용자입니다.')
			}
			if (message === "Doesn't Not Found") {
				return alert('존재하지 않는 문서입니다.')
			}
		}
		if (status === 500) {
			if (message === 'Bsm Client is Invalid') {
				return alert('BSM AUTH 시스템에 오류가 발생했습니다.')
			}
			if (message === 'Internal Server Error') {
				return alert('서버에 오류가 발생했습니다.')
			}
		}
		return Promise.reject(error)
	}
)
export { bumawikiAxios }
