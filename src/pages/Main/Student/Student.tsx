import React, { useEffect, useState } from 'react'
import * as C from 'allFiles';
import './Student.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Docs from 'types/docs';

const Student = () => {
    const [students, setStudents] = useState([]);
    const [allDate] = useState([2023]);
    const nowDate = new Date();

    useEffect(() => {
        for (let date = nowDate.getFullYear() - 1; date >= 2021; date--) {
            allDate.push(date)
        }
        axios.get('/docs/student')
            .then((res) => {
                const data = res.data.sort((a: Docs, b: Docs) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
                setStudents(data);
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err);
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
        // eslint-disable-next-line
    }, []);

    return (
        <div>
            <C.Header />
            <div className="student-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:학생</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>학생</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        {allDate.map(date => (
                            <C.AccodianMenu name={`${date}학년도 입학생`} key={date} isOpen={date === 2023 ? false : true}>
                                <ul className="student-list">
                                    {students.map((student: Docs) => (<div key={student.id}>
                                        {student.enroll === date ?
                                            <li><Link to={`/docs/${student.id}`} className='link'>{student.title}</Link></li> : ''}
                                    </div>))}
                                </ul>
                            </C.AccodianMenu>))}
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

export default Student;