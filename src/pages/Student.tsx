import React, { useState } from 'react'
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
import '../style/pages-style/Student.scss'
import { Link } from 'react-router-dom';

const Student = () => {
    const [stdId, setStdId] = useState('');
    function ChangeId(e:string){
        setStdId(e);
    }
    return (
        <div>
            <Header />
            <div className="student-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:학생</span>
                    </div>
                    <div className="classif-box">
                        <Classify>학생</Classify>
                    </div>
                    <div className="line" />
                    {/* 입학년도별 입학생 */}
                    <div className='summary-wrap'>
                        <AccodianMenu name={'2021학년도 입학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='student-list'>
                                        <li><Link to={`/student/${stdId}`} className='link'><div onClick={e => ChangeId(String(e.currentTarget))}>김준서</div></Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => ChangeId(e.currentTarget.text)}>김한울</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => setStdId(e.currentTarget.text)}>박다은</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => setStdId(e.currentTarget.text)}>송주영</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => setStdId(e.currentTarget.text)}>우수경</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => setStdId(e.currentTarget.text)}>이규진</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => setStdId(e.currentTarget.text)}>이동호</Link></li>
                                        <li><Link to={`/student/${stdId}`} className='link' onClick={e => console.log(e.currentTarget.text)}>이동훈</Link></li>
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'2022학년도 입학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='student-list'>
                                        <li><Link to={`/student/${1}`} className='link'>강웅빈</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>구윤하</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>권세원</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>김나현</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>김민석</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>김민준</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>김호현</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>문서빈</Link></li>
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'2023학년도 입학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='student-list'>
                                        <li><Link to={`/student/${1}`} className='link'>강지원</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>이재윤</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>이상준</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>김호현</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>이윤찬</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>오창민</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>박사밀</Link></li>
                                        <li><Link to={`/student/${1}`} className='link'>석사밀</Link></li>
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

export default Student;