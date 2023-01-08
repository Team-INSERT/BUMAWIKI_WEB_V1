import React, { useEffect, useState } from 'react';
import * as C from 'allFiles';
import 'style/pages-style/Club.scss'
import { Link } from 'react-router-dom';
import axios, { AxiosError } from 'axios';
import Docs from 'types/docs';

const Club = () => {
    const [clubs, setClubs] = useState([]);

    useEffect(() => {
        axios.get('/docs/club')
            .then((res) => {
                const data = res.data.sort((a: Docs, b: Docs) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1)
                setClubs(data)
            })
            .catch((err) => {
                if (err instanceof AxiosError) {
                    console.log(err)
                    alert('오류가 발생하여 문서를 불러올 수 없습니다.');
                }
            })
    }, []);

    return (
        <div>
            <C.Header />
            <div className="club-board-wrap">
                <C.Board>
                    <div className="doc-title-box">
                        <span>부마위키:동아리</span>
                    </div>
                    <div className="classif-box">
                        <C.Classify>동아리</C.Classify>
                    </div>
                    <div className="line" />
                    <div className='summary-wrap'>
                        <C.AccodianMenu name={`전공동아리`}>
                            <ul className="club-list">
                                {clubs.map((club: Docs) => (
                                    <li key={club.id}><Link to={`/docs/${club.id}`} className='link'>{club.title}</Link></li>
                                ))}
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

export default Club;