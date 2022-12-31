import React, { useState } from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    AccodianMenu,
    Classify,
    ScrollBtn,
} from 'allFiles';
import 'style/pages-style/Club.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const Club = () => {
    const [club, setClub] = useState([
        {
            id: 0,
            title: '',
            enroll: 0,
        }
    ]);

    axios.get('/docs/club')
        .then((res) => {
            setClub(res.data)
        })
        .catch((err) => {
            if (err instanceof AxiosError) {
                console.log(err)
                // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            }
        })

    return (
        <div>
            <Header />
            <div className="club-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:동아리</span>
                    </div>
                    <div className="classif-box">
                        <Classify>동아리</Classify>
                    </div>
                    <div className="line" />
                    {/* 입학년도별 입학생 */}
                    <div className='summary-wrap'>
                        <AccodianMenu name={'전공동아리'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='club-list'>
                                        {club.map((club) => (
                                            <li><Link to={`/club/docs/find/${club.id}`} className='link'>{club.title}</Link></li>
                                        ))}
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <SubFooter />
                </Board>
                <ScrollBtn />
                <Aside />
            </div>
            <Footer />
        </div>
    );
};

export default Club;