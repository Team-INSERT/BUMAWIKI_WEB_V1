import axios from 'axios';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const params = new URLSearchParams(window.location.search);
    const navigate = useNavigate();
    useEffect(() => {
        axios.post('/auth/oauth/bsm', {
            headers: {
                authCode: params.get("code")
            }
        }).then((res) => {
            document.cookie = `accessToken=${res.data.accessToken};`
            document.cookie = `refreshToken=${res.data.refreshToken};`
            document.cookie = `expiredAt=${res.data.expiredAt};`
            navigate('/')
        }).catch((err) => {
            console.log(err)
            navigate('/')
            alert('로그인 도중 오류가 발생했습니다.')
        })
        // eslint-disable-next-line
    }, []);

    return <></>;
};

export default Signup;