import React, { useEffect, useState } from 'react';
import * as C from 'allFiles';
import 'style/pages-style/Accident.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Docs from 'types/docs';

const Accident = () => {
    const [accidents, setAccidents] = useState([]);
    const [allDate] = useState([2023]);
    const nowDate = new Date();

    useEffect(() => {
        for (let date = nowDate.getFullYear() - 1; date >= 2021; date--) {
            allDate.push(date)
        }
        axios.get(`/docs/accident`)
            .then((res) => {
                setAccidents(res.data)
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
            <div className="accident-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:사건/사고</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>사건/사고</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        {allDate.map((date) => (
                            <C.AccodianMenu name={`${date}년 사건/사고`} key={date}>
                                <ul className="accident-list">
                                    {accidents.map((accident: Docs) => (<div key={accident.id}>
                                        {accident.enroll === date ?
                                            <li><Link to={`/docs/${accident.id}`} className='link'>{accident.title}</Link></li> : ''}
                                    </div>))}
                                </ul>
                            </C.AccodianMenu>
                        ))}
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

export default Accident;