import React, { useEffect, useState } from 'react';
import * as C from 'allFiles';
import '../style/pages-style/Teacher.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';
import Docs from 'types/docs';

const Teacher = () => {
    const [major, setMajor] = useState([]);
    const [humanities, setHumanities] = useState([]);

    useEffect(() => {
        axios.get('/docs/teacher')
            .then((res) => {
                setHumanities(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
        axios.get('/docs/majorTeacher')
            .then((res) => {
                setMajor(res.data)
            })
            .catch((err) => {
                console.log(err)
                alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            })
    }, []);

    return (
        <div>
            <C.Header />
            <div className="teacher-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:선생님</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>선생님</C.Classify>
                    </div>
                    <div className="line" />
                    <span className='teacher-warning-text'>※ 필독! 문서 내 대상을 비하하는 내용을 서술하는 사용자는 부마위키 이용에 제한을 받을 수 있습니다 ※</span>
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={`인문과목 선생님`}>
                            <ul className="teacher-list">
                                {humanities.map((teacher: Docs) => (<div key={teacher.id}>
                                    <li><Link to={`/docs/${teacher.id}`} className='link'>{teacher.title}</Link></li>
                                </div>))}
                            </ul>
                        </C.AccodianMenu>
                        <C.AccodianMenu name={`전공과목 선생님`}>
                            <ul className="teacher-list">
                                {major.map((teacher: Docs) => (<div key={teacher.id}>
                                    <li><Link to={`/docs/${teacher.id}`} className='link'>{teacher.title}</Link></li>
                                </div>))}
                            </ul>
                        </C.AccodianMenu>
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

export default Teacher;