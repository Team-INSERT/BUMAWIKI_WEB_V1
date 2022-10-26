import {
    Header,
    Footer,
    Aside,
    Board,
    Classify,
    AccodianMenu,
    SubFooter,
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
                        <Classify>부마위키</Classify>
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

                    {/* 타이틀박스 ( 소개 표 ) */}

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

                    {/* 개요, 학과 등 학교 설명 컴포넌트 */}

                    <div className='summary-wrap'>
                        <AccodianMenu name={'개요'}>
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
                            <div className='summary-video'>
                                <iframe width="560" height="315" src="https://www.youtube.com/embed/DIvVZouIVpQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                            </div>
                        </AccodianMenu>
                    </div>
                    <div className='department-wrap'>
                        <AccodianMenu name={'학과'}>
                            <p className='department-description'><span>1학년때에는 공통이며, 2학년 때 소프트웨어개발과 32명, 임베디드소프트웨어과 32명으로 나뉘게 된다.</span></p>
                            <span className='department'>소프트웨어개발과</span>
                            <p className='department-description' style={{ marginTop: '20px' }}>
                                <span>SW구조에 대한 이해를 바탕으로 다양한 SW개발 도구 및 설계 방법을 학습함으로써 SW분석, 설계, 구현, 시험, 유지 보수 등의<br /> 업무를 능동적으로 수행할 수 있는 진보적이고 창의적인 SW 개발자를 양성한다.</span>
                            </p>
                            <span className='department'>임베디드소프트웨어과</span>
                            <p className='department-description' style={{ marginTop: '20px' }}>
                                <span>전자기기 및 산업용 기기의 HW와 SW에 대한 이해를 바탕으로 제조업 하드웨어를 제어하는 펌웨어 개발, 시험, 유지 보수를<br /> 능동적으로 수행할 수 있는 시스템 SW엔지니어 및 응용 SW엔지니어를 양성한다.</span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='song-wrap'>
                        <AccodianMenu name={'교가'}>
                            <p className='song-description'>
                                <span>
                                    옛 가야 푸른 정기 서려도는 낙동강 구비<br />
                                    새 천년 조국 빛낼 배움터 솟았네<br />
                                    저마다 가슴가슴 큰 희망 품어 안고<br />
                                    창의와 성실로 진리를 탐구하는<br />
                                    우리는 모두 하나 힘 모아 전진하세<br />
                                    영원토록 길이 빛날 부산소프트웨어마이스터고
                                </span>
                            </p>
                        </AccodianMenu>
                    </div>
                    <div className='history-wrap'>
                        <AccodianMenu name={'학교 연혁'}>
                            <div className='history-description'>
                                <div className='titleBox-wrap'>
                                    <div className='table-wrap' style={{ marginTop: '-4px', borderTop: '2px solid #ccc' }}>
                                        <div className='table-name'>
                                            <span>날짜</span>
                                        </div>
                                        <div className='table-content' style={{ backgroundColor: '#274168', color: 'white', borderLeft: '2px solid #ccc' }}>
                                            <span>연혁</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2021.03.01</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>부산소프트웨어마이스터고등학교 개교</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2021.03.01</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>제22대 윤혜정 교장 취임</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2020.02.11</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>제48회 졸업식(57명), 졸업생 총 9,800명</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2019.09.11</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>제21대 김은수 교장 취임</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2010.12.31</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>학교평가 최우수학교 선정(교육과학기술부장관상)</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2010.04.14</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>부산광역시교육청 우수특성화고로 선정</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2006.12.20</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>전국 100대 교육과정 우수학교 선정</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2005.12.20</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>학교현장 평가 최우수학교 선정</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2002.12.20</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>실험실습 최우수 학교로 교육감상 수상</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>2000.03.07</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>부산산업과학고등학교 개교</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>1992.03.01</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>부산서여자상업고등학교로 교명 변경</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>1977.03.01</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>김해여자상업고등학교로 교명 변경</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>1974.03.01</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>김해상업고등학교로 교명 변경</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-name'>
                                            <span>1970.03.26</span>
                                        </div>
                                        <div className='table-content'>
                                            <span>가락종합고등학교 개교</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </AccodianMenu>
                    </div>
                    <div className='bus-wrap'>
                        <AccodianMenu name={'운행 버스'}>
                            <div className='bus-content'>
                                <p>세 노선 다 배차간격이 길어 이용하기 어려운 편이다. 심지어 김해 4번과 강서2번, 강서15-1번은 일 8회만 운행한다.<br />그래서 기숙사 입소, 퇴소 날에는 학교에서 셔틀버스를 운행한다.</p>
                            </div>
                            <div className='bus-description'>
                                <div className='titleBox-wrap'>
                                    <div className='table-wrap' style={{ marginTop: '-4px', borderTop: '2px solid #ccc' }}>
                                        <div className='table-content'>
                                            <span>부산산업과학고교 / 부산소프트웨어마이스터고교</span>
                                        </div>
                                        <div className='table-name'>
                                            <span>4, 강서 7-2</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px' }}>
                                        <div className='table-content'>
                                            <span>부산산업과학고등학교</span>
                                        </div>
                                        <div className='table-name'>
                                            <span>강서 2</span>
                                        </div>
                                    </div>
                                    <div className='table-wrap' style={{ marginTop: '-4px', marginBottom: '80px' }}>
                                        <div className='table-content'>
                                            <span>덕포마을</span>
                                        </div>
                                        <div className='table-name'>
                                            <span>강서 15-1</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default Home;