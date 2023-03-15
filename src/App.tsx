import * as R from './allFiles'
import * as api from 'api/user'

import userState from 'context/userState'
import axios, { AxiosError } from 'axios'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'
import tokenExpired from 'lib/token/tokenExpired'

axios.defaults.baseURL = 'http://bumawiki.kro.kr/api'

const App = () => {
	const setUser = useSetRecoilState(userState)

	const getUser = async () => {
		try {
			const data = await api.getUser()
			setUser({
				...data,
				contributeDocs: data.contributeDocs.reverse(),
				isLogin: true,
			})
		} catch (err) {
			console.error('로그인 후 서비스를 이용해주세요!')
		}
	}

	const refreshLogin = async () => {
		try {
			await getUser()
		} catch (err) {
			if (err instanceof AxiosError) {
				const { status, message } = err?.response?.data
				if (status === 403) {
					if (message === 'User Not Login') return console.error('로그인 후 서비스를 이용해주세요!')
					await tokenExpired()
				}
				getUser()
			}
		}
	}

	React.useEffect(() => {
		refreshLogin()
		// eslint-disable-next-line
	}, [])

	return (
		<Router>
			<Routes>
				<Route path={'/'} element={<R.Home />} />
				<Route path={'/student'} element={<R.Student />} />
				<Route path={'/teacher'} element={<R.Teacher />} />
				<Route path={'/accident'} element={<R.Accident />} />
				<Route path={'/club'} element={<R.Club />} />
				<Route path={'/frame'} element={<R.Frame />} />
				<Route path={'/docs/:title'} element={<R.Docs />} />
				<Route path={'/search/:result'} element={<R.Search />} />
				<Route path={'/oauth'} element={<R.Signup />} />
				<Route path={'/create'} element={<R.Create />} />
				<Route path={'/update/:title'} element={<R.Update />} />
				<Route path={'/version/:title'} element={<R.Version />} />
				<Route path={'/version/:title/detail/:versionId'} element={<R.VersionDetail />} />
				<Route path={'/mypage'} element={<R.MyPage />} />
				<Route path={'/user/:id'} element={<R.User />} />
				<Route path={'*'} element={<R.NotFound />} />
			</Routes>
		</Router>
	)
}

export default App
