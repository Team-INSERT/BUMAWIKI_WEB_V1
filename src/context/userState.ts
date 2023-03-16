import { atom } from 'recoil'

export const initUserState = {
	id: 0,
	email: '',
	nickName: '',
	authority: '',
	contributeDocs: [],
}

export const userState = atom({
	key: 'userState',
	default: initUserState,
})
