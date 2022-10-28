import React from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    AccodianMenu,
    Classify
} from 'src/allFiles';
import '../style/pages-style/Accident.scss'

const Accident = () => {
    return (
        <div>
            <Header />
            <div className="accident-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:사건/사고</span>
                    </div>
                    <div className="classif-box">
                        <Classify>사건/사고</Classify>
                    </div>
                    <div className="line" />
                    {/* 사건/사고 목록 */}
                    <div className='summary-wrap'>
                        <AccodianMenu name={'학생'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='accident-list'>
                                        <li>김민준 피자 사건</li>
                                        <li>룸메가 샤워하다가 타방출입 걸린 사건</li>
                                        <li>김석진 아침운동 없음 페이크 사건</li>
                                        <li>기말고사 주주원 급습 사건</li>
                                        <li>기숙사 내 애정행각 발각 사건</li>
                                        <li>기숙사 방문 9연속 파괴 사건</li>
                                        <li>샤워중 사감 난입 사건</li>
                                        <li>점호 50분 사건</li>
                                    </ul>
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='summary-wrap'>
                        <AccodianMenu name={'선생님'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='accident-list'>
                                        <li>방소연 선생님 하극상 사건</li>
                                        <li>유근찬 선생님 노쇼 사건</li>
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

export default Accident;