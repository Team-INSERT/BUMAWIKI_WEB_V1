import * as C from 'allFiles';
import axios, { AxiosError } from 'axios';
import React, { useEffect, useState } from 'react';
import '../style/pages-style/Create.scss'

const Docs = () => {
    const newDate = new Date();
    const date = newDate.getFullYear()

    return (
        <div>
            <C.Header />
            <div className="docs-board-wrap">
                <C.Board>
                    <div className="docs-title-box">
                        <span>문서 생성</span>
                    </div>
                    <div className='create-table'>
                        <div className='tr-wrap'>
                            <div className='tr-title'>분류</div>
                            <div className='tr-content'>
                                <input type='radio' className='classify' id='Ca' name='classify' />
                                <label htmlFor='Ca'>선생님</label>
                                <input type='radio' className='classify radio' id='Cb' name='classify' />
                                <label htmlFor='Cb'>사건/사고</label>
                                <input type='radio' className='classify radio' id='Cc' name='classify' />
                                <label htmlFor='Cc'>동아리</label>
                            </div>
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>문서 이름</div>
                            <input className='tr-content' />
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>작성연도</div>
                            <input className='tr-content' disabled={true} value={`${date}년`} />
                        </div>
                        <div className='tr-wrap tr-example'>
                            <div className='tr-title'>예시</div>
                            <div className='tr-content'>
                                <img src='/images/docs-example.png' className='docs-example' alt='문서 양식' />
                                <span className='docs-example-warn'>※ 이 외의 다른 태그들은 문서에 적용되지 않습니다 ※</span>
                            </div>
                        </div>
                        <div className='tr-wrap last-wrap tr-text'>
                            <div className='tr-title'>문서 내용</div>
                            <textarea className='tr-textarea' />
                        </div>
                    </div>
                    <div className='create-submit'>
                        <span className='create-warn'>※ 필독! 문서 내 부적절한 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</span>
                        <button>문서 생성</button>
                    </div>
                    <C.SubFooter />
                </C.Board>
                <C.ScrollBtn />
                <C.Aside />
            </div>
            <C.Footer />
        </div>
    );
};

export default Docs;