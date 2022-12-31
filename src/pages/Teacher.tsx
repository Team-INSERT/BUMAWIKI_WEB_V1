import React, { useState } from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify,
    AccodianMenu,
    ScrollBtn
} from 'allFiles';
import '../style/pages-style/Teacher.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';

const Teacher = () => {

    return (
        <div>
            <Header />
            <div className="teacher-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:선생님</span>
                    </div>
                    <div className="classif-box">
                        <Classify>선생님</Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <AccodianMenu name={'선생님'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='teacher-list'>
                                        <li><Link to={`/teacher/${1}`} className='link'>조윤겸</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김규봉</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>강은수</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김경남</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김태영</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김태정</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>남민형</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>이경숙</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>정필립</Link></li>
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

export default Teacher;