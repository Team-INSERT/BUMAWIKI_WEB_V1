import React from 'react';
import { Link } from 'react-router-dom';
import '../style/components-style/Aside.scss';

const Aside = () => {
    return (
        <div className='aside-wrap'>
            {/* 글자가 넘어갈 경우 슬라이싱 필요, map 사용 필요 (요소개수 : 10개) */}
            <div className='aside-title-box'>
                <span>인기 문서</span>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>권세원 (학생)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>중간고사 당일 짜장면 탈옥 (사건사고)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>프론트에게 서버 클론 시전 (사건사고)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>친구없는 화법을 쓰시네 (사건사고)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>박우빈 (학생)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>AK-47 (학생)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>T자형 인재 (동아리)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>xxx (선생님)</Link>
            </div>
            <div className='aside-doc-box'>
                <Link to={''} className='list'>히히 기숙사 못들어와 (사건사고)</Link>
            </div>
            <div className='aside-doc-box' style={{ borderBottom: 'none' }}>
                <Link to={''} className='list'>저 피자만 가지고 가려고... (사건사고)</Link>
            </div>
        </div>
    );
};

export default Aside;