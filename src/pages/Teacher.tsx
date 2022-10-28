import React from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify,
    AccodianMenu
} from 'src/allFiles';
import '../style/pages-style/Teacher.scss'

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
                    {/* 일반/전공 선생님 명단 */}
                    <div className='summary-wrap'>
                        <AccodianMenu name={'일반과목 선생님'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='teacher-list'>
                                        <li>조윤겸</li>
                                        <li>김규봉</li>
                                        <li>강은수</li>
                                        <li>김경남</li>
                                        <li>김태영</li>
                                        <li>김태정</li>
                                        <li>남민형</li>
                                        <li>이경숙</li>
                                        <li>정필립</li>
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'전공과목 선생님'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='teacher-list'>
                                        <li>유근찬</li>
                                        <li>김진필</li>
                                        <li>구진영</li>
                                        <li>최병준</li>
                                        <li>정유진</li>
                                        <li>이선아</li>
                                        <li>김기태</li>
                                        <li>박제현</li>
                                        <li>이세준</li>
                                        <li>손정웅</li>
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <SubFooter />
                </Board>
                <Aside />
            </div>
            <Footer />
        </div>
    );
};

export default Teacher;