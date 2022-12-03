import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { dateUTCParser } from 'util/dateUTCParser'

const Signup = () => {
    const navigate = useNavigate()
    useEffect(() => {
        axios.post('/auth/oauth/bsm', {}, {
            headers: {
                authCode: window.location.search.replace('?code=', '')
            }
        }).then((res) => {
            document.cookie = `authorization=${res.data.accessToken};`
            document.cookie = `refresh_token=${res.data.refreshToken};expires=${dateUTCParser(res.data.expiredAt)};path=/;`
            navigate('/')
            window.location.reload()
        }).catch((err) => {
            console.log(err)
            navigate('/')
            alert('로그인 도중 오류가 발생했습니다.')
        })
        // eslint-disable-next-line
    }, [])

    return <></>
}

export default Signup