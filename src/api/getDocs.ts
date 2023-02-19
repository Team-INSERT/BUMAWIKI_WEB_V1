import axios from 'axios'

export const getDocs = async (title: string) => {
	return (await axios.get(`/docs/find/title/${title}`)).data
}

export const getLastModifiedDocs = async () => {
	return (await axios.get('/docs/find/modified')).data
}

export const findDocs = async (title: string) => {
	return (await axios.get(`/docs/find/all/title/${title}`)).data
}

export const getVersionDocs = async (title: string) => {
	return (await axios.get(`docs/find/${title}`)).data
}

export const getBaseDocs = async (docsType: string) => {
	return (await axios.get(`/docs/${docsType}`)).data
}
