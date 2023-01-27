import axios from 'axios'
import * as FC from 'utils/function'

export const logoutUser = async () => {
	return await axios.delete('/auth/bsm/logout', {
		data: {
			refresh_token: FC.getCookie('refresh_token'),
		},
	})
}

export const loginUser = async (authCode: string) => {
	return (
		await axios.post(
			'/auth/oauth/bsm',
			{},
			{
				headers: { authCode },
			}
		)
	).data
}

export const getOtherUser = async (id: number) => {
	return (await axios.get(`/user/id/${id}`)).data
}

export const getUser = async () => {
	return (
		await axios.get(`/user`, {
			headers: {
				Authorization: FC.getCookie('authorization'),
			},
		})
	).data
}

export const getRefreshToken = async () => {
	return await axios.put('/auth/refresh/access', {
		refresh_token: FC.getCookie('refresh_token'),
	})
}
