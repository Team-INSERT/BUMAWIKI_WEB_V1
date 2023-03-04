import * as R from './allFiles'
import * as FC from 'utils'
import * as api from 'api/user'

import userState from 'context/userState'
import axios from 'axios'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { useSetRecoilState } from 'recoil'

axios.defaults.baseURL = 'http://bumawiki.kro.kr/api'

const App = () => {
	const setUser = useSetRecoilState(userState)

	const refreshLogin = async () => {
		const data = await api.getUser()
		setUser({
			...data,
			contributeDocs: data.contributeDocs.reverse(),
			isLogin: true,
		})
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
