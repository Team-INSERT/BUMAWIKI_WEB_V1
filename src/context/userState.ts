import { atom } from 'recoil'

export const initUserState = {
	id: '',
	email: '',
	nickName: '',
	authority: '',
	contributeDocs: [],
}

export const userState = atom({
	key: 'userState',
	default: initUserState,
})
