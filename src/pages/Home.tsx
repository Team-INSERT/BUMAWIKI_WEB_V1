import {
    Header,
    Footer,
    Aside,
    Board,
    Classification,
    TitleBox,
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
                    <TitleBox />
                    <div className='summary-wrap'>
                        <div className='summary-title'>
                            <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.7751 22.7249C16.5433 22.9562 16.3594 23.231 16.234 23.5334C16.1085 23.8358 16.0439 24.16 16.0439 24.4874C16.0439 24.8149 16.1085 25.1391 16.234 25.4415C16.3594 25.7439 16.5433 26.0187 16.7751 26.2499L28.2501 37.7249C28.4813 37.9567 28.7561 38.1406 29.0585 38.266C29.3609 38.3915 29.6851 38.4561 30.0126 38.4561C30.34 38.4561 30.6642 38.3915 30.9666 38.266C31.2691 38.1406 31.5438 37.9567 31.7751 37.7249L43.2501 26.2499C43.4815 26.0185 43.6651 25.7437 43.7904 25.4413C43.9156 25.1389 43.9801 24.8148 43.9801 24.4874C43.9801 24.1601 43.9156 23.836 43.7904 23.5336C43.6651 23.2312 43.4815 22.9564 43.2501 22.7249C43.0186 22.4935 42.7438 22.3099 42.4414 22.1846C42.139 22.0594 41.8149 21.9949 41.4876 21.9949C41.1602 21.9949 40.8361 22.0594 40.5337 22.1846C40.2313 22.3099 39.9565 22.4935 39.7251 22.7249L30.0001 32.4249L20.3001 22.7249C19.3251 21.7749 17.7251 21.7749 16.7751 22.7249Z" fill="#818181" />
                            </svg>
                            <span className='summary'>개요</span>
                        </div>
                        <div className='line' style={{ width: '100%' }} />
                        <p className='summary-content'>
                            <span>
                                환영합니다! 창의와 성실로 꿈을 펼치는 부산소프트웨어마이스터고등학교입니다.<br />
                                부산소프트웨어마이스터고등학교 학생이라면 누구나 문서를 편집하고 작성할 수 있습니다.<br />
                                <br />
                                사실에 근거하고 남을 비방하거나 칭찬하지 않는 선에서 자유롭게 문서를 편집할 수 있습니다.<br />
                                문의 및 문서삭제는 <span style={{ color: 'blue', fontWeight: 400 }}>boomawiki@gmail.com</span>으로 요청하실 수 있습니다.<br />
                                <br />
                                <span style={{ fontWeight: 800 }}>
                                    교내의 모든 유/무선 네트워크 정보는 국가정보원 『국가·공공기관의 무선망 구축 보안 가이드라인, 국가정보보안 기본지침』 과,<br />
                                    교육부 『정보보안기본지침』에 따라 대외비로 관리되고 있으니 절대로 기재해서는 안 됩니다.
                                </span>
                            </span>
                        </p>
                    </div>
                </Board>
                <Aside />
            </div>
            <Footer />
        </div>
    );
};

export default Home;