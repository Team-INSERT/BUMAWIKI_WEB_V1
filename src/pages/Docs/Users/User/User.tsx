import * as C from 'allFiles'
import React, { useEffect, useState } from 'react'
import '../MyPage/MyPage.scss'
import { dateParser } from 'util/dateParser'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import Contributors from 'types/contributors'

const MyPage = () => {
    const [user, setUser] = useState({
        id: 0,
        nickName: '알 수 없음',
        authority: '',
        contributeDocs: []
    })
    const router = useParams()

    useEffect(() => {
        axios.get(`/api/user/id/${router.id}`)
            .then((res) => {
                setUser(res.data)
            })
            .catch((err) => {
                alert('유저 정보를 불러오는 도중 오류가 발생했습니다.')
                console.log(err)
                return
            })
    }, [router.id])

    return (
        <div>
            <C.Header />
            <div className='mypage-wrap'>
                <C.Board>
                    <div className="mypage-title-box">
                        <span>유저 : {user.nickName}</span>
                    </div>
                    <div className='margin' />
                    <C.Classify>{user.authority}</C.Classify>
                    <div className='mypage-line' />
                    <div className='mypage-info-box'>
                        <C.AccodianMenu name={'정보'}>
                            <div className='mypage-info'>
                                <span>이름은 {user.nickName}이며, 부마위키의 {user.authority === 'ADMIN' ? '관리자' : '사용자'} 중 한 명이다.</span>
                            </div>
                        </C.AccodianMenu>
                        <C.AccodianMenu name={'기여한 문서'}>
                            <div className='contribute-info'>
                                <span className='contribute-text'>이 유저가 기여한 문서의 정보들이다.</span>
                                <div className='contribute-list'>
                                    {user.contributeDocs.map((docs: Contributors, index) => (
                                        <span key={index}>문서명 : <Link className='contribute-link' to={`/docs/${docs.docsId}`}>{docs.title}[{docs.docsId}]</Link><br />
                                            수정 날짜 : {dateParser(docs.createTime)}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </C.AccodianMenu>
                        <div className='line margin' />
                    </div>
                </C.Board>
                <C.Aside />
            </div>
            <C.ScrollBtn />
            <C.Footer />
        </div>
    )
}

export default MyPage