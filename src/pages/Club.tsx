import React from 'react';
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

const Club = () => {
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
                                        <li><Link to={`/club/${1}`} className='link'>쉬스테마</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>T자형 인재</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>COIN</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>Ber(blessing software)</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>우최동</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>야누스</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>마나무네</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>JJOK</Link></li>
                                        <li><Link to={`/club/${1}`} className='link'>오태식과 친구들</Link></li>
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