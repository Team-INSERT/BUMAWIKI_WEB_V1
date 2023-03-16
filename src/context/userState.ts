import { atom } from 'recoil'

export const initUserState = {
	id: 0,
	email: '',
	nickName: '',
	authority: '',
	contributeDocs: [],
	isLogin: localStorage.getItem('access_token') ? true : false,
}

export const userState = atom({
	key: 'userState',
	default: initUserState,
})
