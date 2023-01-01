import React, { useEffect, useState } from 'react';
import * as C from 'allFiles';
import 'style/pages-style/Accident.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const Accident = () => {
    const [docs, setDocs] = useState([]);

    useEffect(() => {
        axios.get(`/docs/accident`)
            .then((res) => {
                console.log(res)
                setDocs(res.data)
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, []);

    return (
        <div>
            <C.Header />
            <div className="accident-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:사건/사고</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>사건/사고</C.Classify>
                    </div>
                    <div className="line" />
                    {/* 사건/사고 목록 */}
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={'사건/사고'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='accident-list'>
                                        <li><Link to={`/accident/${1}`} className='link'>피자만 가지고 가려고...</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>룸메가 샤워해서 벌점</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>김석진 : 힌남노에 의해 아침운동이 없을 예정입니다.</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>교무부장 선생님께 국어 선생님의 소심한 하극상</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>유근찬 선생님 노쇼</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>기말고사 당일 주주원 급습</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>기숙사 내 애정행각 발각</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>기숙사 방문 파괴자</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>샤워중인데 사감쌤 들어옴</Link></li>
                                        <li><Link to={`/accident/${1}`} className='link'>점호 50분</Link></li>
                                    </ul>
                                </span>
                            </p>
                        </C.AccodianMenu>
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    );
};

export default Accident;