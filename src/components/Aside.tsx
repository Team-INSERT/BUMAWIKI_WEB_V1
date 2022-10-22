import React from 'react';
import '../style/Aside.scss';

const Aside = () => {
    return (
        <div className='aside-wrap'>
            {/* 글자가 넘어갈 경우 슬라이싱 필요, map 사용 필요 (요소개수 : 10개) */}
            <div className='aside-title-box'>
                <span>인기 문서</span>
            </div>
            <div className='aside-doc-box'>
                <span>권세원 (학생)</span>
            </div>
            <div className='aside-doc-box'>
                <span>중간고사 당일 짜장면 탈옥 (사건사고)</span>
            </div>
            <div className='aside-doc-box'>
                <span>프론트에게 서버 클론 시전 (사건사고)</span>
            </div>
            <div className='aside-doc-box'>
                <span>친구없는 화법을 쓰시네 (사건사고)</span>
            </div>
            <div className='aside-doc-box'>
                <span>박우빈 (학생)</span>
            </div>
            <div className='aside-doc-box'>
                <span>AK-47 (학생)</span>
            </div>
            <div className='aside-doc-box'>
                <span>T자형 인재 (동아리)</span>
            </div>
            <div className='aside-doc-box'>
                <span>xxx (선생님)</span>
            </div>
            <div className='aside-doc-box'>
                <span>히히 기숙사 못들어와 (사건사고)</span>
            </div>
            <div className='aside-doc-box' style={{ borderBottom: 'none' }}>
                <span>저 피자만 가지고 가려고... (사건사고)</span>
            </div>
        </div>
    );
};

export default Aside;