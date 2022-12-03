import axios from 'axios'
import React, { useEffect, useState } from 'react'
import * as C from 'allFiles'
import { Link, useParams } from 'react-router-dom'
import { dateParser } from '../../../util/dateParser'
import './Version.scss'

const Version = () => {
    const router = useParams()
    const [version, setVersion] = useState([])
    const [isLoad, setIsLoad] = useState(false)
    useEffect(() => {
        axios.get(`docs/find/${router.title}/version`)
            .then((res) => {
                setVersion(res.data.versionDocsResponseDto.reverse())
                console.log(res.data.versionDocsResponseDto)
                setIsLoad(true)
            })
            .catch((err) => {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.')
            })
    }, [router.title])
    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>문서 수정 기록</span>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <ul>
                            {isLoad ? <>{version.map((ver: any, index: number) => (
                                <li className='version-list'>
                                    <span className='version-span'><Link to={`/version/${router.title}/detail/${index}`} className='version-link'>{dateParser(ver.thisVersionCreatedAt)}</Link></span>
                                    <span>작성자 : <Link to={`/user/${ver.userId}`} className='user-link'>{ver.nickName}</Link></span>
                                </li>
                            ))}</> : ''}
                        </ul>
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    )
}

export default Version