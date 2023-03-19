import * as api from 'api/user'

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
import { Helmet } from 'react-helmet-async'

const Signup = () => {
	const navigate = useNavigate()

	const { mutate } = useMutation(() => api.loginUser(window.location.search.replace('?code=', '')), {
		onSuccess: (data) => {
			localStorage.setItem('access_token', data.accessToken)
			localStorage.setItem('refresh_token', data.refreshToken)
			localStorage.setItem('refresh_token_expired_at', data.expiredAt)
			navigate(-2)
		},
		onError: () => navigate(-2),
	})

	React.useEffect(() => {
		mutate()
		// eslint-disable-next-line
	}, [])

	return (
		<Helmet>
			<title>부마위키 - 로그인</title>
		</Helmet>
	)
}

export default Signup
