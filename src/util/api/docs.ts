import axios from 'axios'
import * as FC from 'util/function'

export const getDocs = async (title: string) => {
	return (await axios.get(`/docs/find/title/${title}`)).data
}

export const getLastModifiedDocs = async () => {
	return (await axios.get('/docs/find/modified')).data
}

export const findDocs = async (title: string) => {
	return (await axios.get(`/docs/find/all/title/${title}`)).data
}

export const updateDocsTitle = async (title: string, docsName: string) => {
	return await axios.put(
		`/docs/update/title/${title}`,
		{ title: docsName },
		{
			headers: {
				Authorization: FC.getCookie('authorization'),
			},
		}
	)
}

export const deleteDocs = async (title: string) => {
	return await axios.delete(`/docs/delete/${title}`, {
		headers: {
			Authorization: FC.getCookie('authorization'),
		},
	})
}

export const createDocs = async (data: any) => {
	return (
		await axios.post('/docs/create', data, {
			headers: {
				'Content-Type': `multipart/form-data`,
				Authorization: FC.getCookie('authorization'),
				refresh_token: FC.getCookie('refresh_token'),
			},
		})
	).data
}

export const updateDocs = async (data: any, title: string) => {
	return await axios.put(`docs/update/${title}`, data, {
		headers: {
			'Content-Type': `multipart/form-data`,
			Authorization: FC.getCookie('authorization'),
		},
	})
}

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

export const getVersionDocs = async (title: string) => {
	return (await axios.get(`docs/find/${title}`)).data
}

export const getBaseDocs = async (docsType: string) => {
	return (await axios.get(`/docs/${docsType}`)).data
}
