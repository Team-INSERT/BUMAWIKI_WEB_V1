import { bumawikiAxios } from 'lib/axios/customAxios'
import { getCookie } from 'utils'
import delCookie from 'utils/etc/delCookie'

const tokenExpired = async () => {
	try {
		const res = await bumawikiAxios.put('/auth/refresh/access', {
			refresh_token: getCookie('refresh_token'),
		})
		document.cookie = `authorization=${res.data.accessToken};`
	} catch (err) {
		delCookie('authorization')
		delCookie('refresh_token')
	}
}

export default tokenExpired
