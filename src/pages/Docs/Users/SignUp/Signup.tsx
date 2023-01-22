import * as FC from 'util/'

import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Signup = () => {
	const navigate = useNavigate()

	const getSignUpData = async () => {
		try {
			const res = await axios.post(
				'/auth/oauth/bsm',
				{},
				{
					headers: {
						authCode: window.location.search.replace('?code=', ''),
					},
				}
			)
			document.cookie = `authorization=${res.data.accessToken};`
			document.cookie = `refresh_token=${res.data.refreshToken};expires=${FC.dateUTCParser(res.data.expiredAt)};path=/;`
			navigate('/')
			window.location.reload()
		} catch (err) {
			console.log(err)
			navigate('/')
			alert('로그인 도중 오류가 발생했습니다.')
		}
	}

	React.useEffect(() => {
		getSignUpData()
		// eslint-disable-next-line
	}, [])

	return <></>
}

export default Signup
