import {
    Header,
    Footer,
    Aside,
    Board,
    Classification,
} from 'src/allFiles';
import React from 'react';
import '../style/pages-style/Home.scss';

const Home = () => {
    return (
        <div>
            <Header />
            <div className='home-board-wrap'>
                <Board>
                    <div className='doc-title-box'>
                        <span>부마위키:대문</span>
                    </div>
                    <div className='classif-box'>
                        <Classification>부마위키</Classification>
                    </div>
                    <div className='line' />
                    <div className='home-title-box'>
                        <span className='home-title-text'>여러분이 가꾸어 나가는 <span style={{ color: '#274168' }}>역사의 고서</span></span>
                        <span className='home-subtitle-text'><span style={{ color: '#274168' }}>부마위키</span>에 오신 것을 환영합니다!</span>
                        <span className='home-title-content-text'>
                            <span style={{ color: '#274168' }}>부마위키</span>는 부산소마고 학생이라면 누구나 기여할 수 있는 위키입니다.
                            <br />
                            검증되지 않았거나 편향된 내용이 있을 수 있습니다.
                        </span>
                    </div>
                    <div className='line' />
                </Board>
                <Aside />
            </div>
            {/* <Footer /> */}
        </div>
    );
};

export default Home;