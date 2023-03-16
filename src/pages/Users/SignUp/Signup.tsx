import * as FC from 'utils'
import * as api from 'api/user'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'

const Signup = () => {
	const navigate = useNavigate()

	const { mutate } = useMutation(() => api.loginUser(window.location.search.replace('?code=', '')), {
		onSuccess: (data) => {
			document.cookie = `authorization=${data.accessToken};`
			document.cookie = `refresh_token=${data.refreshToken};expires=${FC.dateUTCParser(data.expiredAt)};path=/;`
			navigate(-2)
		},
		onError: () => {
			navigate(-2)
			alert('로그인 도중 오류가 발생했습니다.')
		},
	})

	React.useEffect(() => {
		mutate()
		// eslint-disable-next-line
	}, [])

	return <></>
}

export default Signup
