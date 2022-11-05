import React from 'react'
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify,
    AccodianMenu
} from 'allFiles';
import '../style/pages-style/Student.scss'

const Student = () => {
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
                                        <li>김준서</li>
                                        <li>김한울</li>
                                        <li>박다은</li>
                                        <li>송주영</li>
                                        <li>우수경</li>
                                        <li>이규진</li>
                                        <li>이동호</li>
                                        <li>이동훈</li>
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
                                        <li>강웅빈</li>
                                        <li>구윤하</li>
                                        <li>권세원</li>
                                        <li>김나현</li>
                                        <li>김민석</li>
                                        <li>김민준</li>
                                        <li>김호현</li>
                                        <li>문서빈</li>
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
                                        <li>강지원</li>
                                        <li>이재윤</li>
                                        <li>이상준</li>
                                        <li>김호현</li>
                                        <li>이윤찬</li>
                                        <li>오창민</li>
                                        <li>박사밀</li>
                                        <li>석사밀</li>
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

export default Student;