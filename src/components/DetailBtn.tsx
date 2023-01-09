import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import { dateParser } from 'util/dateParser';
import '../style/components-style/DetailBtn.scss';
import { UserContext } from 'App';
import { getCookie } from 'util/getCookie';

const DetailBtn = () => {
    const router = useParams();
    const user = useContext(UserContext);
    const [docsName, setDocsName] = useState('');
    const navigate = useNavigate();
    const [docs, setDocs] = useState({
        id: '',
        title: '',
        docsType: '',
        enroll: 0,
        contents: '',
        lastModifiedAt: '',
        view: ''
    });

    const onClickDeleteDocs = () => {
        axios.delete(`/docs/delete/${router.id}`, {
            headers: {
                Authorization: getCookie('authorization')
            }
        }).then(() => {
            alert('문서가 삭제되었습니다!')
            navigate('/')
        }).catch((err) => {
            alert('문서 삭제 도중 오류가 발생했습니다.')
            console.log(err)
        })
    }

    const onClickChangeDocsName = () => {
        const data = `{"title": "${docsName}"\n}`;

        axios.put(`/docs/update/title/${router.id}`, {
            headers: {
                Authorization: getCookie('authorization')
            },
            data
        }).then((res) => {
            navigate(`/docs/${res.data.id}`)
        }).catch((err) => {
            alert('문서 이름 변경 도중 오류가 발생했습니다.')
            console.log(err)
        })
    }

    useEffect(() => {
        axios.get(`/docs/find/id/${router.id}`)
            .then((res) => {
                setDocs({
                    ...res.data,
                    lastModifiedAt: dateParser(res.data.lastModifiedAt)
                })
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, [router.id]);
    return (
        <div className="detail-button-wrap">
            {user.isLogin ? <>
                <Link to={`/update/${docs?.id}`} className='link-wrap'>
                    <div>
                        <h1 className='link'>편집</h1>
                    </div>
                </Link>
                <Link to={`/version/${docs?.id}`} className='link-wrap'>
                    <div>
                        <h1 className='link'>기록</h1>
                    </div>
                </Link>{user.authority === 'ADMIN' ? <>
                    <div className='link-wrap' onClick={onClickDeleteDocs}>
                        <div>
                            <h1 className='link'>삭제</h1>
                        </div>
                    </div>
                    <input className='link-wrap-input'
                        value={docsName}
                        onChange={(e) => { setDocsName(e.target.value) }} />
                    <div className='link-wrap' onClick={onClickChangeDocsName}>
                        <div>
                            <h1 className='link'>변경</h1>
                        </div>
                    </div></>
                    : ''}</> : ''}
        </div>
    );
}

export default DetailBtn;