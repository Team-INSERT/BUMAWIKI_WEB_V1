import * as C from 'allFiles';
import axios from 'axios';
import React, { ChangeEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCookie } from 'util/getCookie';
import '../style/pages-style/Create.scss'

const Docs = () => {
    const date = new Date();
    const enroll = date.getFullYear();
    const navigate = useNavigate();
    const [docsType, setDocsType] = useState('');
    const [title, setTitle] = useState('');
    const [contents, setContents] = useState('');
    const [files1, setFiles1] = useState<any>();
    const [files2, setFiles2] = useState<any>();
    const [files3, setFiles3] = useState<any>();

    const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setDocsType(e.target.id)
    }

    const onClickCreateDocs = () => {
        if (title.length === 0) {
            alert('문서의 이름을 정해주세요!')
            return;
        }
        if (!docsType) {
            alert('문서의 분류를 선택해주세요!')
            return;
        }
        const FormData = require('form-data');
        const data = new FormData();
        data.append('request', new Blob([`{ "title": "${title}", "enroll":"${enroll}", "contents":"${contents.replace(/\n/gi, '<br>').replace(/"/gi, '\\"')}", "docsType":"${docsType}"}`], { type: 'application/json' }));
        data.append("files", files1, files1.name);
        data.append("files", files2, files2.name);
        data.append("files", files3, files3.name);
        axios.post('/docs/create', data, {
            headers: {
                'Content-Type': `multipart/form-data`,
                Authorization: getCookie('authorization'),
                refresh_token: getCookie('refresh_token')
            },
        }).then(() => {
            alert('문서가 생성되었습니다!')
            navigate('/');
        }).catch((err) => {
            console.log(err)
            alert('오류가 발생했습니다.')
        })
    }

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
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='TEACHER' name='radio' />
                                <label htmlFor='TEACHER'>인문 교과 선생님</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='MAJOR_TEACHER' name='radio' />
                                <label htmlFor='MAJOR_TEACHER'>전문 교과 선생님</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='ACCIDENT' name='radio' />
                                <label htmlFor='ACCIDENT'>사건/사고</label>
                                <input type='radio' onChange={(e) => { onChangeRadio(e) }} className='classify radio' id='CLUB' name='radio' />
                                <label htmlFor='CLUB'>동아리</label>
                            </div>
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>문서 이름</div>
                            <input className='tr-content' onChange={(e) => { setTitle(e.target.value) }} value={title} />
                        </div>
                        <div className='tr-wrap'>
                            <div className='tr-title'>작성연도</div>
                            <input className='tr-content' disabled={true} value={`${enroll}년`} />
                        </div>
                        <div className='tr-wrap tr-example'>
                            <div className='tr-title'>예시</div>
                            <div className='tr-content'>
                                <img src='/images/docs-example.png' className='docs-example' alt='문서 양식' />
                            </div>
                        </div>
                        <div className='tr-wrap tr-file'>
                            <div className='tr-title'>이미지</div>
                            <div className="inputs">
                                <input type="file" className='tr-input' onChange={(e) => { setFiles1(e.target.files instanceof FileList ? e.target.files[0] : '');console.log(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                <input type="file" className='tr-input' onChange={(e) => { setFiles2(e.target.files instanceof FileList ? e.target.files[0] : '');console.log(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                <input type="file" className='tr-input' onChange={(e) => { setFiles3(e.target.files instanceof FileList ? e.target.files[0] : '');console.log(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                {/* <input type="file" className='tr-input' onChange={(e) => { setFiles(e.target.files instanceof FileList ? e.target.files[0] : '') }} />
                                <input type="file" className='tr-input' onChange={(e) => { setFiles(e.target.files instanceof FileList ? e.target.files[0] : '') }} /> */}
                            </div>
                        </div>
                        <div className='tr-wrap constents-wrap tr-text'>
                            <div className='tr-title'>문서 내용</div>
                            <textarea className='tr-textarea' onChange={(e) => { setContents(e.target.value) }} value={contents} />
                        </div>
                    </div>
                    <div className='create-submit'>
                        <span className='create-warn'>※ 필독! 문서 내 부적절한 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</span>
                        <button onClick={onClickCreateDocs}>문서 생성</button>
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