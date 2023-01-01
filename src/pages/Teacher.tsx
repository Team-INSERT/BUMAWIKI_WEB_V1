import React, { useEffect, useState } from 'react';
import {
    Header,
    Board,
    SubFooter,
    Aside,
    Footer,
    Classify,
    AccodianMenu,
    ScrollBtn
} from 'allFiles';
import '../style/pages-style/Teacher.scss'
import { Link } from 'react-router-dom';
import axios from 'axios';

const Teacher = () => {
    const [teachers, setTeachers] = useState([{
        id: 0,
        title: '',
    }]);

    useEffect(() => {
        axios.get('/docs/majorTeacher')
            .then((res) => {
                console.log(res)
                setTeachers(res.data)
            })
            .catch((err) => {
                console.log(err)
                // alert('오류가 발생하여 문서를 불러올 수 없습니다.');
            })
    }, []);

    return (
        <div>
            <Header />
            <div className="teacher-board-wrap">
                <Board>
                    <div className="doc-title-box">
                        <span>부마위키:선생님</span>
                    </div>
                    <div className="classif-box">
                        <Classify>선생님</Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <AccodianMenu name={'선생님'}>
                            <div className='summary-content'>
                                <span>
                                    <ul className='teacher-list'>
                                        {teachers.map((teacher) => (
                                            <li><Link to={`/docs/${teacher.id}`} className='link'>{teacher.title}</Link></li>
                                        ))}
                                    </ul>
                                </span>
                            </div>
                        </AccodianMenu>
                    </div>
                    <SubFooter />
                </Board>
                <ScrollBtn />
                <Aside />
            </div>
            <Footer />
        </div>
    );
};

export default Teacher;