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
                        <AccodianMenu name={'사건/사고'}>
                            <p className='summary-content'>
                                <span>
                                    <ul className='accident-list'>
                                        <li>피자만 가지고 가려고...</li>
                                        <li>룸메가 샤워해서 벌점</li>
                                        <li>김석진 : 힌남노에 의해 아침운동이 없을 예정입니다.</li>
                                        <li>교무부장 선생님께 국어 선생님의 소심한 하극상</li>
                                        <li>유근찬 선생님 노쇼</li>
                                        <li>기말고사 당일 주주원 급습</li>
                                        <li>기숙사 내 애정행각 발각</li>
                                        <li>기숙사 방문 파괴자</li>
                                        <li>샤워중인데 사감쌤 들어옴</li>
                                        <li>점호 50분</li>
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