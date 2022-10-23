import React from 'react';
import '../style/components-style/TitleBox.scss';

const TitleBox = () => {
    return (
        <div className='titleBox-wrap'>
            <div className='titleBox-main-title'>
                <span className='titleBox-title'>부산소프트웨어마이스터고등학교</span>
                <span className='titleBox-eng-title'>Busan Software Meister High School</span>
            </div>
            <img className='school-img' src={'/images/school-night.jpeg'} alt='부산소마고' />
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교훈</span>
                </div>
                <div className='table-content'>
                    <span>創意(창의), 誠實(성실)</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>개교</span>
                </div>
                <div className='table-content'>
                    <span>1970년 3월 26일 가락종합고등학교</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>유형</span>
                </div>
                <div className='table-content'>
                    <span>마이스터고등학교</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>성별</span>
                </div>
                <div className='table-content'>
                    <span>남녀공학</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>형태</span>
                </div>
                <div className='table-content'>
                    <span>공립학교</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교목</span>
                </div>
                <div className='table-content'>
                    <span>소나무 - 장수(長壽), 꿋꿋한 절개와 의지를 보이다.</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교화</span>
                </div>
                <div className='table-content'>
                    <span>목련 - 우애있고 사랑스러우며 고귀하다.</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교조</span>
                </div>
                <div className='table-content'>
                    <span>솔개 - 유연하고 민첩하며 늠름한 기상으로 높이 날아 세계를 보다.</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교장</span>
                </div>
                <div className='table-content'>
                    <span>윤혜정 교장선생님</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>학생 수</span>
                </div>
                <div className='table-content'>
                    <span>122명 (2022.09.26)</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>교직원 수</span>
                </div>
                <div className='table-content'>
                    <span>22명 (2021.11.28)</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>관할 교육청</span>
                </div>
                <div className='table-content'>
                    <span>부산광역시교육청</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>주소</span>
                </div>
                <div className='table-content'>
                    <span>부산광역시 강서구 가락대로 1393 (가락동)</span>
                </div>
            </div>
            <div className='table-wrap' style={{ marginTop: '-4px' }}>
                <div className='table-name'>
                    <span>홈페이지</span>
                </div>
                <div className='table-content'>
                    <a href='https://school.busanedu.net/bssm-h/main.do' target={'_blank'} rel={'noreferrer'}>https://bssm.hs.kr</a>
                </div>
            </div>
        </div>
    );
};

export default TitleBox;