import React from 'react';
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
                    <div className='summary-wrap'>
                        <AccodianMenu name={'전공과목 선생님'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='teacher-list'>
                                        <li><Link to={`/teacher/${1}`} className='link'>유근찬</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김진필</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>구진영</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>최병준</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>정유진</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>이선아</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>김기태</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>박제현</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>이세준</Link></li>
                                        <li><Link to={`/teacher/${1}`} className='link'>손정웅</Link></li>
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