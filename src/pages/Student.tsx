import React from 'react'
import * as C from 'allFiles';
import '../style/pages-style/Student.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Student = () => {
    axios.get('http://172.103.51.102/docs/find/1/version')
        .then((res) => {
            console.log(res)
        })
        .catch((err) => {
            console.log(err)
        })
    return (
        <div>
            <C.Header />
            <div className="student-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:학생</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>학생</C.Classify>
                    </div>
                    <div className="line" />
                    {/* 입학년도별 입학생 */}
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={'2021학년도 입학생'}>
                            <ul className="student-list">
                                {C.Dummy.student.map(student => (<>
                                    {student.enroll === 2021 ?
                                        <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                </>))}
                            </ul>
                        </C.AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={'2022학년도 입학생'}>
                            <p className='summary-content'>
                                <ul className="student-list">
                                    {C.Dummy.student.map(student => (<>
                                        {student.enroll === 2022 ?
                                            <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                    </>))}
                                </ul>
                            </p>
                        </C.AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={'2023학년도 입학생'}>
                            <p className='summary-content'>
                                <ul className="student-list">
                                    {C.Dummy.student.map(student => (<>
                                        {student.enroll === 2023 ?
                                            <li><Link to={`/student/${student.name}`} className='link'>{student.name}</Link></li> : ''}
                                    </>))}
                                </ul>
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

export default Student;