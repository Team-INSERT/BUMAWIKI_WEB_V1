import { bumawikiAxios } from 'lib/axios/customAxios'
import { getCookie } from 'utils'

const tokenExpired = async () => {
	try {
		const res = await bumawikiAxios.put('/auth/refresh/access', {
			refresh_token: getCookie('refresh_token'),
		})
		document.cookie = `authorization=${res.data.accessToken};`
	} catch (err) {
		alert('세션이 만료되었습니다. 다시 로그인해주세요.')
	}
}

export default tokenExpired
