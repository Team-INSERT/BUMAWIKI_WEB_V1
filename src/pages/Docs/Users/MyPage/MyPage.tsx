import * as C from 'allFiles'
import { UserContext } from 'App'
import React, { useContext } from 'react'
import './MyPage.scss'
import { dateParser } from 'util/dateParser'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { getCookie } from 'util/getCookie'
import Contributors from 'types/contributors'

const MyPage = () => {
    const user = useContext(UserContext)

    const onClickLogOut = () => {
        axios.delete('/auth/bsm/logout', {
            data: {
                refresh_token: getCookie('refresh_token')
            }
        }).then(() => {
            document.cookie = `authorization=; expires=Sat 02 Oct 2021 17:46:04 GMT; path=/;`
            document.cookie = `refresh_token=; expires=Sat 02 Oct 2021 17:46:04 GMT; path=/;`
            window.location.reload()
        }).catch((err) => {
            alert('로그아웃에 실패했습니다.')
            console.log(err)
        })
    }
    console.log(user)

    return (
        <div>
            <C.Header />
            <div className='mypage-wrap'>
                <C.Board>
                    <div className="mypage-title-box">
                        <span>{`마이페이지 : ${user.nickName || "비로그인 유저"}`}</span>
                    </div>
                    <div className='margin' />
                    <C.Classify>{user.authority}</C.Classify>
                    <div className='mypage-line' />
                    <div className='mypage-info-box'>
                        <C.AccodianMenu name={'정보'}>
                            <div className='mypage-info'>
                                {user.id ? <>
                                    <span>이름은 {user.nickName}이며, 부마위키의 {user.authority === 'ADMIN' ? '관리자' : user.authority === 'BANNED' ? '읽기전용 사용자' : '사용자'} 중 한 명이다.</span>
                                    <span>이 유저의 아이디는 '{user.id}'이며, 이메일은 {user.email}이다.</span><br />
                                    <span className='logout' onClick={onClickLogOut}>로그아웃</span></>
                                    : <span>이 유저는 로그인을 하지 않은 유저다. 로그인을 하면 문서를 생성하고 편집할 수 있다.</span>}
                                <br />
                            </div>
                        </C.AccodianMenu>
                        {user.id ? <>
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
                            <div className='line margin' /></> : ''}
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