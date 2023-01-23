import { atom } from 'recoil'

const userState = atom({
	key: 'userState',
	default: {
		id: 0,
		email: '',
		nickName: '',
		authority: 'USER',
		contributeDocs: [],
		isLogin: false,
	},
})

export default userState
