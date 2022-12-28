import React, { useState } from 'react'
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify,
    AccodianMenu,
    ScrollBtn,
    Dummy
} from 'allFiles';
import '../style/pages-style/Student.scss'
import { Link } from 'react-router-dom';

const Student = () => {
    console.log(Dummy);
    const [stdId, setStdId] = useState('');
    function ChangeId(e: string) {
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
                                    <ul className="student-list">
                                        {Dummy.student.map(student => (<>
                                            {student.enroll === 2021 ?
                                                <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                        </>))}
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'2022학년도 입학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className="student-list">
                                        {Dummy.student.map(student => (<>
                                            {student.enroll === 2022 ?
                                                <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                        </>))}
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'2023학년도 입학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className="student-list">
                                        {Dummy.student.map(student => (<>
                                            {student.enroll === 2023 ?
                                                <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                        </>))}
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