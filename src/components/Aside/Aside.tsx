import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { changeKor } from 'util/changeKor';
import { getLastDate } from 'util/getLastDate';
import './Aside.scss';

interface Docs {
    title: string,
    docsType: string,
    id: number,
    lastModifiedAt: string,
}

const Aside = () => {
    const [lastModifiedDocs, setLastModifiedDocs] = useState([]);

    useEffect(() => {
        axios.get('/docs/find/modified')
            .then((res) => {
                setLastModifiedDocs(res.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, []);

    return (
        <div className='aside-wrap'>
            <div className='aside-title-box'>
                <span>최근 수정된 문서</span>
            </div>
            {lastModifiedDocs.map((docs: Docs) => (
                <div className='aside-doc-box' key={docs.id}>
                    <Link to={`/docs/${docs.id}`} className='list'>{docs.title.length > 12 ? `${docs.title.slice(0, 12)}...` : docs.title} ({changeKor(docs.docsType).replace('전공교과 선생님', '선생님').replace('일반교과 선생님', '선생님').replace('사건/사고', '사건')})</Link>
                    <span className='last-date'>&nbsp;― {getLastDate(docs.lastModifiedAt)}</span>
                </div>
            ))}
        </div>
    );
};

export default Aside;